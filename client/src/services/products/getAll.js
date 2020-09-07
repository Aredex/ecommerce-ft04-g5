import axios from "axios";

export default async function getAll() {
  return axios
    .get(`http://localhost:3001/products`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}
