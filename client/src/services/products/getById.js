import axios from "axios";

export default async function getById(id) {
  return axios
    .get(`${process.env.REACT_APP_API}/products/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}
