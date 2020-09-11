import { useLocalStorage } from "react-use";
import { useDispatch, useSelector } from "react-redux";
import { setShoppingCart } from "store/Actions/Orders";
import { useCallback } from "react";
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

  // A futuro debe verificar si existe usuario
  if (false) {
  } else {
    dispatch(setShoppingCart(localShoppingCart));
  }

  const addProduct = useCallback((id, name, price, amount) => {
    if (user && shoppingCart) {
      const productSearchResult = shoppingCart.products.find(
        (x) => (x.id = id)
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
      const newShoppingCart = { ...shoppingCart };
      const productSearchResult = newShoppingCart.products.find(
        (x) => (x.id = id)
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
      dispatch(setShoppingCart(localShoppingCart));
    }
  }, []);

  return {
    shoppingCart,
    addProduct,
  };
}
