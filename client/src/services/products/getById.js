import axios from "axios";

export default async function getById(id) {
  return axios
    .get(`http://localhost:3001/products/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}
