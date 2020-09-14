import axios from "axios";


export default async function getProductsFromCategory(id) {
  return axios
    .get(`http://localhost:3001/categories/${id}/products`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}
