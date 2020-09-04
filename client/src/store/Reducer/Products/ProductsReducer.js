import { Switch } from "react-router";

const initialState = {
  productCards: [],
  productSearch: [],
  productDetail: {},
  productCreate: {},
};

export default function ProductsReducer(state = initialState, action) {
  switch (action.type) {
    case "CREATE_PRODUCT":
      return {
        ...state,
        productCreate: action.payload,
      };

    case "GET_PRODUCTS":
      return {
        ...state,
        productCards: action.payload,
      };

    case "GET_PRODUCT_DETAIL":
      return {
        ...state,
        productDetail: action.payload,
      };

    case "SEARCH_PRODUCT":
      return {
        ...state,
        productSearch: action.payload,
      };

    default:
      return state;
  }
}
