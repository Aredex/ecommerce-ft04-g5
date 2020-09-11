const initialState = {
  productCards: [],
  productSearch: [],
  categoryFilter: [],
  productDetail: undefined,
  productCreate: null,
  productReadOnly: null,
  productUpdate: null,
  productRemove: null,
  suggestions: null
};

export default function ProductsReducer(state = initialState, action) {
  switch (action.type) {
    case "CREATE_PRODUCT":
      return {
        ...state,
        productDetail: action.payload
      };
    case "SEARCH_PRODUCT":
      return {
        ...state,
        productSearch: action.payload
      };

    case "PRODUCTS_FROM_CATEGORY":
      console.log("entro")
      console.log(action.payload)
      return {
        ...state,
        categoryFilter: action.payload
      };
    case "GET_PRODUCTS":
      return {
        ...state,
        productCards: action.payload,
      };

    case "SUGGESTIONS":
      return {
        ...state,
        suggestions: action.payload,
      };
    case "GET_PRODUCT_DETAIL":
      return {
        ...state,
        productDetail: action.payload,
      };
    case "HANDLE_VIEW_PRODUCT":
      return {
        ...state,
        productReadOnly: true,
      };
    case "HANDLE_UPDATE_PRODUCT":
      return {
        ...state,
        productUpdate: true,
      };
    case "HANDLE_CREATE_PRODUCT":
      return {
        ...state,
        productDetail: {
          name: "",
          description: "",
          price: 1,
          stock: 0,
          imageUrl: "",
          categories: [],
        },
        productCreate: true
      };
    case "DISABLED_PRODUCT_CRUD":
      return {
        ...state,
        productUpdate: null,
        productReadOnly: null,
        productRemove: null,
        productCreate: null
      };
    case "REMOVE_PRODUCT":
      return {
        ...state,
        productRemove: action.payload,
      };

    default:
      return state;
  }
}
