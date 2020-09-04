const initialState = {
  productCards: [],
  productSearch: [],
  productDetail: {}
};

export default function ProductsReducer(state = initialState, action) {
  if (action.type === "ADD_PRODUCT") {
    return {
      ...state,
      productCards: state.productCards.concat(action.payload)
    }
  }
  if (action.type === "GET_PRODUCTS") {
    return {
      ...state,
      productCards: action.payload
    }

  }
  if (action.type === "GET_PRODUCT_DETAIL") {
    return {
      ...state,
      productDetail: state.productCards.filter((e) => e.id === action.payload ? true : false)[0]
    }
  }
  if (action.type === "SEARCH_PRODUCT") {
    return {
      ...state,
      productSearch: action.payload
    }
  }

  return state;
}