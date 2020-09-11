import { search, create, remove, getById, getAll, update, addCategoryToProduct, removeCategoryToProduct } from "services/products";
import getCategories from "services/categories/getAll";

export function addCategoryProduct(productId, categoryId) {
  return function (dispatch) {
    return addCategoryToProduct(productId, categoryId)
      .then(function (data) {
        dispatch({ type: "ADD_CATEGORY_PRODUCT", payload: data });
      });
  }
}

export function removeCategoryProduct(productId, categoryId) {
  return function (dispatch) {
    return removeCategoryToProduct(productId, categoryId)
      .then(function (data) {
        dispatch({ type: "REMOVE_CATEGORY_PRODUCT", payload: data });
      });
  }
}

export function handleViewProduct(id) {
  return function (dispatch) {
    dispatch(getProductDetail(id))
      .then(function () {
        dispatch({ type: "HANDLE_VIEW_PRODUCT" })
      })
  }
}
export function suggestions() {
  return function (dispatch) {
    return getCategories()
      .then(function (data) {
        dispatch({ type: "SUGGESTIONS", payload: data })
      })
  }
}
export function handleUpdateProduct(id) {
  return function (dispatch) {
    dispatch(getProductDetail(id))
      .then(function () {
        dispatch(suggestions())
      })
      .then(function () {
        dispatch({ type: "HANDLE_UPDATE_PRODUCT" })
      })
  }
}
export function handleCreateProduct(id) {
  return function (dispatch) {
    dispatch(suggestions())
      .then(function () {
        dispatch({ type: "HANDLE_CREATE_PRODUCT" })
      })
  }
}

export function getProducts() {
  return function (dispatch) {
    return getAll()
      .then(function (data) {
        dispatch({ type: "GET_PRODUCTS", payload: data })
      })
  }
}
export function getProductDetail(id) {
  return function (dispatch) {
    return getById(id)
      .then((data) => {
        dispatch({ type: "GET_PRODUCT_DETAIL", payload: data });
      })
  };

}

export function searchProduct(name) {
  return function (dispatch) {
    return search(name)
      .then(function (data) {
        dispatch({ type: "SEARCH_PRODUCT", payload: data })
      })
  };
}

export function removeProduct(id) {
  return function (dispatch) {
    return remove(id).then(function (data) {
      dispatch({ type: "REMOVE_PRODUCT", payload: data });
    });
  };
}

export function updateProduct(id, name, description, price, stock) {
  return function (dispatch) {
    return update(id, name, description, price, stock).then(function (data) {
      dispatch({ type: "UPDATE_PRODUCT", payload: data });
    });
  };
}

export function createProduct(name, description, price, stock, imageUrl) {
  return function (dispatch) {
    return create(name, description, price, stock, imageUrl).then(function (data) {
      dispatch({ type: "CREATE_PRODUCT", payload: data });
      return data
    });
  }
}

export function disabledProductCRUD() {
  return { type: "DISABLED_PRODUCT_CRUD" }
}
