import getById from "services/products/getById";
import getAll from "services/products/getAll";

var arrayPrueba = [
  {
    title: "Planta 1",
    price: 450,
    id: 1,
  },
  {
    title: "Planta 2",
    price: 150,
    id: 2,
  },
  {
    title: "Planta 3",
    price: 12450,
    id: 3,
  },
];

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
    return getById(id).then(function (data) {
      dispatch({ type: "GET_PRODUCT_DETAIL", payload: data });
    });
  };
}

export function searchProduct(filter) {
  return function (dispatch) {
    return dispatch({
      type: "SEARCH_PRODUCT",
      payload: arrayPrueba.filter(function (e) {
        for (const prop in e) {
          if (e[prop].toString().includes(filter)) {
            return true;
          }
        }
      }),
    });
  };
}
