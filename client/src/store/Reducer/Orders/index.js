import { orders } from "store/ActionTypeNames";

const { ADD_PRODUCT_TO_SHOPPINGCART, SET_SHOPPINGCART } = orders;

const initialState = {
  shoppingCart: undefined,
};

export default function OrdersReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT_TO_SHOPPINGCART:
      let newState = { ...state };
      if (state.shoppingCart) {
        newState.shoppingCart.push(action.payload);
      } else {
        newState.shoppingCart = { products: [action.payload] };
      }
      return newState;
    case SET_SHOPPINGCART:
      return { ...state, shoppingCart: action.payload };
    default:
      return state;
  }
}
