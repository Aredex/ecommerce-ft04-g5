const initialState = {
  categories: [],
  catogoryCreate: null,
  categoryUpdate: {},
  categoryRemove: {},
  categoryID: {},
};

export default function UsersReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };

    case "CREATE_CATEGORY":
      return {
        ...state,
        catogoryCreate: true,
      };

    case "UPDATE_CATEGORY":
      return {
        ...state,
        categoryUpdate: action.payload,
      };

    case "REMOVE_PRODUCT":
      return {
        ...state,
        categoryRemove: action.payload,
      };

    case "GET_CATEGORY_BY_ID":
      return {
        ...state,
        categoryID: action.payload,
      };

    default:
      return state;
  }

  return state;
}
