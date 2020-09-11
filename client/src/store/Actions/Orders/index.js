import { orders } from "store/ActionTypeNames";

export function addProductToShoppingCart(id, name, price, amount) {
  const { ADD_PRODUCT_TO_SHOPPINGCART } = orders;
  return {
    type: ADD_PRODUCT_TO_SHOPPINGCART,
    payload: {
      id,
      name,
      price,
      amount,
    },
  };
}

export function setShoppingCart(shoppingCart) {
  const { SET_SHOPPINGCART } = orders;
  return {
    type: SET_SHOPPINGCART,
    payload: shoppingCart,
  };
}
