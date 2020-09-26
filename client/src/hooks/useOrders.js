import { useLocalStorage } from "react-use";
import { useDispatch, useSelector } from "react-redux";
import { setShoppingCart } from "store/Actions/Orders";
import { useCallback, useEffect } from "react";
import Axios from "axios";
import useUser from 'hooks/useUser';
import { getById } from "services/user";
import { getOrderById } from "services/orders";

export default function useOrders() {
  const [
    localShoppingCart,
    setLocalShoppingCart,
  ] = useLocalStorage("shopping_cart", undefined);

  const dispatch = useDispatch();
  const shoppingCart = useSelector((state) => state.orders.shoppingCart);
  const { userLogin } = useUser()

  const reloadShoppingCart = useCallback(() => {
    if (userLogin) {

      (async () => {

        const user = await getById(userLogin.user.id)
        const { orders } = user

        let orderInCreation = orders.find((order) => order.status === "IN CREATION")
        if (orderInCreation) {
          let total = 0;
          const products = orderInCreation.products.reduce((result, item) => {
            const newItem = { id: item.id, name: item.name, price: item.order_product.price, amount: item.order_product.amount, stock: item.stock }
            total += item.order_product.price * item.order_product.amount;
            return [...result, newItem]
          }, [])
          orderInCreation.products = products

          if (localShoppingCart) {
            Axios.post(`${process.env.REACT_APP_API}/orders/${orderInCreation.id}/products`, {
              idUser: userLogin.user.id,
              products: localShoppingCart.products,
            }).then(({ data }) => {
              let total = 0;
              total =
                data &&
                data.products &&
                Array.isArray(data.products) &&
                data.products.reduce((result, product) => {
                  result += product.order_product.price * product.order_product.amount;
                  return result;
                }, 0);
              setLocalShoppingCart(null)
              dispatch(
                setShoppingCart({
                  id: data.id,
                  status: data.status,
                  address: data.adress,
                  userId: data.userId,
                  total,
                  products: data.products.map((product) => ({
                    id: product.id,
                    name: product.name,
                    price: product.order_product.price,
                    amount: product.order_product.amount,
                    stock: product.stock,
                  })),
                })
              )
            }
            );
          } else {
            dispatch(setShoppingCart({ ...orderInCreation, total }))
          }
        } else {
          if (localShoppingCart) {
            Axios.post(`${process.env.REACT_APP_API}/orders/products`, {
              idUser: userLogin.user.id,
              products: localShoppingCart.products,
            }).then(({ data }) => {
              let total = 0;
              total =
                data &&
                data.products &&
                Array.isArray(data.products) &&
                data.products.reduce((result, product) => {
                  result += product.order_product.price * product.order_product.amount;
                  return result;
                }, 0);
              setLocalShoppingCart(null)
              dispatch(
                setShoppingCart({
                  id: data.id,
                  status: data.status,
                  address: data.adress,
                  userId: data.userId,
                  total,
                  products: data.products.map((product) => ({
                    id: product.id,
                    name: product.name,
                    price: product.order_product.price,
                    amount: product.order_product.amount,
                    stock: product.stock,
                  })),
                })
              )
            }
            );
          } else {
            dispatch(setShoppingCart(undefined))
          }
        }
      })()

    } else {
      let total = 0;
      total =
        localShoppingCart &&
        localShoppingCart.products &&
        Array.isArray(localShoppingCart.products) &&
        localShoppingCart.products.reduce((result, product) => {
          result += product.price * product.amount;
          return result;
        }, 0);
      localShoppingCart &&
        localShoppingCart.products &&
        Array.isArray(localShoppingCart.products) &&
        localShoppingCart.products.length > 0
        ? dispatch(setShoppingCart({ ...localShoppingCart, total }))
        : dispatch(setShoppingCart(undefined));
    }
  }, [localShoppingCart, userLogin, dispatch, setLocalShoppingCart])

  useEffect(() => {
    reloadShoppingCart()
  }, [reloadShoppingCart]);

  const addProduct = (id, name, price, amount, stock) => {
    if (userLogin) {
      const productSearchResult = shoppingCart ? shoppingCart.products.find(
        (x) => x.id === id
      ) : undefined;
      if (productSearchResult) {
        amount += productSearchResult.amount;
      }
      if (shoppingCart) {
        if (shoppingCart.id) {
          Axios.post(
            `${process.env.REACT_APP_API}/orders/${shoppingCart.id}/product/${id}`,
            { amount, idUser: userLogin.user.id }
          ).then(({ data }) => {
            let total = 0;
            total =
              data &&
              data.products &&
              Array.isArray(data.products) &&
              data.products.reduce((result, product) => {
                result += product.order_product.price * product.order_product.amount;
                return result;
              }, 0);
            dispatch(
              setShoppingCart({
                id: data.id,
                status: data.status,
                address: data.adress,
                userId: data.userId,
                total,
                products: data.products.map((product) => ({
                  id: product.id,
                  name: product.name,
                  price: product.order_product.price,
                  amount: product.order_product.amount,
                  stock: product.stock,
                })),
              })
            )
          }
          );
        }
      } else {
        Axios.post(`${process.env.REACT_APP_API}/orders/products`, {
          idUser: userLogin.user.id,
          products: shoppingCart ? [...shoppingCart.products, { id, amount }] : [{ id, amount }],
        }).then(({ data }) => {
          let total = 0;
          total =
            data &&
            data.products &&
            Array.isArray(data.products) &&
            data.products.reduce((result, product) => {
              result += product.order_product.price * product.order_product.amount;
              return result;
            }, 0);
          dispatch(
            setShoppingCart({
              id: data.id,
              status: data.status,
              address: data.adress,
              userId: data.userId,
              total,
              products: data.products.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.order_product.price,
                amount: product.order_product.amount,
                stock: product.stock,
              })),
            })
          )
        }
        );
      }
    } else if (shoppingCart) {
      const newShoppingCart = { ...shoppingCart };
      const productSearchResult = newShoppingCart.products.find(
        (x) => x.id === id
      );
      if (productSearchResult) {
        productSearchResult.amount += amount;
        productSearchResult.price = price;
      } else {
        newShoppingCart.products.push({ id, name, price, amount, stock });
      }
      setLocalShoppingCart(newShoppingCart);
    } else {
      setLocalShoppingCart({ products: [{ id, name, price, amount, stock }] });
    }
  };

  const increseAmount = (id) => {
    const newShoppingCart = { ...shoppingCart };
    const productSearchResult = newShoppingCart.products.find(
      (x) => x.id === id
    );
    if (productSearchResult) {
      productSearchResult.amount++;
      if (userLogin) {
        Axios.post(
          `${process.env.REACT_APP_API}/orders/${shoppingCart.id}/product/${productSearchResult.id}`,
          { amount: productSearchResult.amount, idUser: userLogin.user.id }
        ).then(({ data }) => {
          let total = 0;
          total =
            data &&
            data.products &&
            Array.isArray(data.products) &&
            data.products.reduce((result, product) => {
              result += product.order_product.price * product.order_product.amount;
              return result;
            }, 0);
          dispatch(
            setShoppingCart({
              id: data.id,
              status: data.status,
              address: data.adress,
              userId: data.userId,
              total,
              products: data.products.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.order_product.price,
                amount: product.order_product.amount,
                stock: product.stock,
              })),
            })
          )
        }
        );
      } else {
        setLocalShoppingCart(newShoppingCart);
      }
    }
  };
  const decreaseAmount = (id) => {
    const newShoppingCart = { ...shoppingCart };
    const productSearchResult = newShoppingCart.products.find(
      (x) => x.id === id
    );
    if (productSearchResult) {
      productSearchResult.amount--;
      if (userLogin) {
        Axios.post(
          `${process.env.REACT_APP_API}/orders/${shoppingCart.id}/product/${productSearchResult.id}`,
          { amount: productSearchResult.amount, idUser: userLogin.user.id }
        ).then(({ data }) => {
          let total = 0;
          total =
            data &&
            data.products &&
            Array.isArray(data.products) &&
            data.products.reduce((result, product) => {
              result += product.order_product.price * product.order_product.amount;
              return result;
            }, 0);
          dispatch(
            setShoppingCart({
              id: data.id,
              status: data.status,
              address: data.adress,
              userId: data.userId,
              total,
              products: data.products.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.order_product.price,
                amount: product.order_product.amount,
                stock: product.stock,
              })),
            })
          )
        }
        );
      } else {
        setLocalShoppingCart(newShoppingCart);
      }
    }
  };
  const removeProduct = async (id) => {
    if (userLogin) {
      await Axios.delete(
        `${process.env.REACT_APP_API}/orders/${shoppingCart.id}/product/${id}`)
      let data = await getOrderById(shoppingCart.id)
      if (data.length === 0) {
        dispatch(
          setShoppingCart(undefined))
      } else {
        data = data[0]
        let total = 0;
        total =
          data &&
          data.products &&
          Array.isArray(data.products) &&
          data.products.reduce((result, product) => {
            result += product.order_product.price * product.order_product.amount;
            return result;
          }, 0);
        dispatch(
          setShoppingCart({
            id: data.id,
            status: data.status,
            address: data.adress,
            userId: data.userId,
            total,
            products: data.products ? data.products.map((product) => ({
              id: product.id,
              name: product.name,
              price: product.order_product.price,
              amount: product.order_product.amount,
              stock: product.stock,
            })) : [],
          })
        )
      }
    } else {
      const newShoppingCart = { ...shoppingCart };
      newShoppingCart.products = newShoppingCart.products.reduce(
        (result, product) => {
          result = [...result];
          if (product.id !== id) result.push(product);
          return result;
        },
        []
      );
      if (newShoppingCart.products.length === 0) {
        setLocalShoppingCart(null)
        dispatch(setShoppingCart(undefined))
      }
      else setLocalShoppingCart(newShoppingCart);
    }
  };

  return {
    shoppingCart,
    increseAmount,
    decreaseAmount,
    removeProduct,
    addProduct,
    reloadShoppingCart
  };
}
