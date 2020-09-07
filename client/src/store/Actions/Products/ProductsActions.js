import { create, remove, getById, getAll, update } from "services/products";

export function createProduct(name, description, price, stock) {
  return function (dispatch) {
    return create(name, description, price, stock).then(function (data) {
      dispatch({ type: "CREATE_PRODUCT", payload: data });
    });
  };
}

export async function getProducts() {
  const payload = await getAll();
  return { type: "GET_PRODUCTS", payload };
}
export async function getProductDetail(id) {
  const payload = await getById(id);
  return { type: "GET_PRODUCT_DETAIL", payload };
}
// export function getProductDetail(id) {
//   return function (dispatch) {
//     return getById(id).then(function (data) {
//       console.log("ENTRO AL PRODUCTO" + data);
//       dispatch({ type: "GET_PRODUCT_DETAIL", payload: data });
//     });
//   };
// }

export function searchProduct(filter) {
  return function (dispatch) {
    return dispatch({
      type: "SEARCH_PRODUCT",
      // payload: arrayPrueba.filter(function (e) {
      //   for (const prop in e) {
      //     if (e[prop].toString().includes(filter)) {
      //       return true;
      //     }
      //   }
      // }),
    });
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
