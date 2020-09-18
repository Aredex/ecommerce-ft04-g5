import { getAllOrders, removeOrder } from "services/orders"
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


export function getAllOrdersAction() {
  return function (dispatch) {
    return getAllOrders()
      .then(function (data) {
        dispatch({ type: "GET_ALL_ORDERS", payload: data });
      });
  }
}

export function removeOrderAction(id){
  return function (dispatch) {
    return removeOrder(id)
    .then( function(data){
      dispatch({ type: "REMOVE_ORDER", payload: data}) 
    })
  }
}


export function disabledCRUD() {
  return { type: "DISABLED_CRUD" }
}