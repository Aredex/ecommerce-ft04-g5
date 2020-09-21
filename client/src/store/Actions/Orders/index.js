import { getAllOrders, removeOrder, setConfirmOrder, setDeliveredOrder, setPrepareOrder, setRejectOrder, setSendOrder, getOrderById } from "services/orders"
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


//----------------------\\\\
export function setConfirmOrderAction(id, address){
  return function(dispatch){
    return removeOrder(id)
    .then( function(data){
      dispatch({type: "CONFIRM_ORDER", payload: data})
    })
  }
}

export function setDeliveredOrderAction(id, address){
  return function(dispatch){
    return setDeliveredOrder(id)
    .then( function(data){
      dispatch({type: "DELIVERED_ORDER", payload: data})
    })
  }
}

export function setPrepareOrderAction(id, address){
  return function(dispatch){
    return setPrepareOrder(id)
    .then( function(data){
      dispatch({type: "PREPARE_ORDER", payload: data})
    })
  }
}

export function setRejectOrderAction(id){
  return function (dispatch) {
    return setRejectOrder(id)
    .then( function(data){
      dispatch({ type: "REJECT_ORDER", payload: data}) 
    })
  }
}

export function setSendOrderAction(id){
  return function (dispatch) {
    return setSendOrder(id)
    .then( function(data){
      dispatch({ type: "SEND_ORDER", payload: data}) 
    })
  }
}
////////////////////////////////////////////////////////////

export function handleViewOrder(id) {
  return function (dispatch) {
    dispatch(getOrderDetail(id))
      .then(()=>{
        dispatch({ type: "HANDLE_VIEW_ORDER" })
      })
  }
}

export function getOrderDetail(id) {
  return function (dispatch) {
    if (!id) { 
      return dispatch({ type: "GET_ORDER_DETAIL", payload: null })
    }
    return getOrderById(id)
      .then((data) => {
        dispatch({ type: "GET_ORDER_DETAIL", payload: data });
      })
  };
}






//


export function disabledCRUD() {
  return { type: "DISABLED_CRUD" }
}