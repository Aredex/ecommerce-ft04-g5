import { create, remove, getById, getAll, update } from "services/categories";

export function createCategory(name, description) {
  return function (dispatch) {
    return create(name, description)
      .then(function (data) {
        dispatch({ type: "CREATE_CATEGORY", payload: data });
      })
  };
}

export function removeCategory(id) {
  return function (dispatch) {
    return remove(id)
      .then(function (data) {
        dispatch({ type: "REMOVE_CATEGORY", payload: data });
      })
  };
}

export function getCategoryById(id) {
  return function (dispatch) {
    return getById(id)
      .then((data) => {
        dispatch({ type: "GET_CATEGORY_BY_ID", payload: data });
      })
  };
}
export function getAllCategories() {
  return function (dispatch) {
    return getAll()
      .then((data) => {
        dispatch({ type: "GET_ALL_CATEGORIES", payload: data });
      })
  };
}


export function updateCategory(id, name, description) {
  return function (dispatch) {
    return update(id, name, description)
      .then(function (data) {
        dispatch({ type: "UPDATE_CATEGORY", payload: data });
      })
  };
}