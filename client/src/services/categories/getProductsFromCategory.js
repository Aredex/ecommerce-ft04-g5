import axios from "axios";


export default async function getProductsFromCategory(id) {
  return axios
    .get(`${process.env.API}/categories/${id}/products`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}
