import getById from "services/products/getById"
import getAll from "services/products/getAll"

export function addProduct(payload) {
  return { type: "ADD_PRODUCT", payload };
}

export function getProducts() {
  return function (dispatch) {
    return getAll()
      .then(function (data) {
        dispatch({ type: "GET_PRODUCTS", payload: data });
      })
  };
}
export function getProductDetail(id) {
  return function (dispatch) {
    return getById(id)
      .then(function (data) {
        dispatch({ type: "GET_PRODUCT_DETAIL", payload: data })
      })
  }
}

export function searchProduct(filter) {
  return function (dispatch) {
    return dispatch({
      type: "SEARCH_PRODUCT",
      payload: arrayPrueba.filter(function (e) {
        for (const prop in e) {
          if (e[prop].toString().includes(filter)) {
            return true
          }
        }
      })
    })
  }
}