export function addProduct(payload) {
  return { type: "ADD_PRODUCT", payload };
}

export function getProducts() {
  return function (dispatch) {
    return dispatch({ type: "GET_PRODUCTS", payload: null });
  };
}
export function getProductDetail(id) {
  return function (dispatch) {
    return dispatch({ type: "GET_PRODUCT_DETAIL", payload: id })
  }
}