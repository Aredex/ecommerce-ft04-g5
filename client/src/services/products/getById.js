import axios from "axios";

export default async function getById(id) {
  return axios
    .get(`${process.env.API}/products/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}
