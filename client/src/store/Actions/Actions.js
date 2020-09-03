var arrayPrueba = [{
  img: "https://laslandas.com/wp-content/uploads/2019/11/abbaye-cluny1.jpg",
  title: "Planta 1",
  price: 450,
  id: 1
}, {
  img: "https://laslandas.com/wp-content/uploads/2019/11/abbaye-cluny1.jpg",
  title: "Planta 2",
  price: 150,
  id: 2
}, {
  img: "https://laslandas.com/wp-content/uploads/2019/11/abbaye-cluny1.jpg",
  title: "Planta 3",
  price: 12450,
  id: 3
}]


export function addProduct(payload) {
  return { type: "ADD_PRODUCT", payload };
}

export function getProducts() {
  return function (dispatch) {
    return dispatch({ type: "GET_PRODUCTS", payload: arrayPrueba });
  };
}
export function getProductDetail(id) {
  return function (dispatch) {
    return dispatch({ type: "GET_PRODUCT_DETAIL", payload: id })
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