import axios from "axios";


export default async function getProductsFromCategory(id) {
  return axios
    .get(`${process.env.REACT_APP_API}/categories/${id}/products`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}
