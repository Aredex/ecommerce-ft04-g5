import { useLocalStorage } from "react-use";
import { useDispatch, useSelector } from "react-redux";
import { setShoppingCart } from "store/Actions/Orders";
import { useCallback, useEffect } from "react";
import Axios from "axios";

const user = null;

export default function useOrders() {
  const [
    localShoppingCart,
    setLocalShoppingCart,
    removeLocalShoppingCart,
  ] = useLocalStorage("shopping_cart", undefined);

  const dispatch = useDispatch();
  const shoppingCart = useSelector((state) => state.orders.shoppingCart);

  useEffect(() => {
    console.log("reload", shoppingCart, localShoppingCart);
    // A futuro debe verificar si existe usuario
    if (false) {
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
  }, [localShoppingCart]);

  const addProduct = useCallback((id, name, price, amount) => {
    if (user && shoppingCart) {
      const productSearchResult = shoppingCart.products.find(
        (x) => x.id === id
      );
      if (productSearchResult) {
        amount += productSearchResult.amount;
      }
      if (shoppingCart.id) {
        Axios.post(
          `http://localhost:3001/orders/${shoppingCart.id}/product/${id}`,
          { amount }
        ).then(({ data }) =>
          dispatch(
            setShoppingCart({
              id: data.id,
              status: data.status,
              address: data.adress,
              userId: data.userId,
              products: data.products.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.order_product.price,
                amount: product.order_product.amount,
              })),
            })
          )
        );
      } else {
        Axios.post(`http://localhost:3001/orders/products`, {
          idUser: user.id,
          product: [...shoppingCart.products, { id, amount }],
        }).then(({ data }) =>
          dispatch(
            setShoppingCart({
              id: data.id,
              status: data.status,
              address: data.adress,
              userId: data.userId,
              products: data.products.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.order_product.price,
                amount: product.order_product.amount,
              })),
            })
          )
        );
      }
    } else if (localShoppingCart) {
      const newShoppingCart = { ...localShoppingCart };
      const productSearchResult = newShoppingCart.products.find(
        (x) => x.id === id
      );
      if (productSearchResult) {
        productSearchResult.amount += amount;
        productSearchResult.price = price;
      } else {
        newShoppingCart.products.push({ id, name, price, amount });
      }
      setLocalShoppingCart(newShoppingCart);
    } else {
      setLocalShoppingCart({ products: [{ id, name, price, amount }] });
    }
  }, []);

  const increseAmount = useCallback((id) => {
    const newShoppingCart = { ...localShoppingCart };
    const productSearchResult = newShoppingCart.products.find(
      (x) => x.id === id
    );
    console.log(newShoppingCart, productSearchResult);
    if (productSearchResult) {
      productSearchResult.amount++;
      setLocalShoppingCart(newShoppingCart);
    }
  });
  const decreaseAmount = useCallback((id) => {
    const newShoppingCart = { ...localShoppingCart };
    const productSearchResult = newShoppingCart.products.find(
      (x) => x.id === id
    );
    if (productSearchResult) {
      productSearchResult.amount--;
      setLocalShoppingCart(newShoppingCart);
    }
  });
  const removeProduct = useCallback((id) => {
    const newShoppingCart = { ...localShoppingCart };
    newShoppingCart.products = newShoppingCart.products.reduce(
      (result, product) => {
        result = [...result];
        if (product.id !== id) result.push(product);
        return result;
      },
      []
    );
    setLocalShoppingCart(newShoppingCart);
  });

  return {
    shoppingCart,
    increseAmount,
    decreaseAmount,
    removeProduct,
    addProduct,
  };
}
