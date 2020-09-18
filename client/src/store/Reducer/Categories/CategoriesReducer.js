const initialState = {
  categories: undefined,
  categoryId: undefined,
  categoryRemove: null,
  categoryCreate: null,
  categoryReadOnly: null,
  categoryUpdate: null
};

export default function CategoriesReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    case "GET_CATEGORY_BY_ID":
      return {
        ...state,
        categoryId: action.payload,
      };
    case "CREATE_CATEGORY":
      return {
        ...state,
      };
    case "UPDATE_CATEGORY":
      return {
        ...state,
      };
    case "REMOVE_CATEGORY":
      return {
        ...state,
        categoryRemove: action.payload,
      };
    case "HANDLE_VIEW_CATEGORY":

      return {
        ...state,
        categoryReadOnly: true,
      };
    case "HANDLE_UPDATE_CATEGORY":
      return {
        ...state,
        categoryUpdate: true
      };
    case "HANDLE_CREATE_CATEGORY":
      return {
        ...state,
        categoryId: { name: '', description: '' },
        categoryCreate: true
      };
    case "DISABLED_CRUD":
      return {
        ...state,
        categoryRemove: null,
        categoryCreate: null,
        categoryReadOnly: null,
        categoryUpdate: null
      };
    default:
      return state;
  }
}
