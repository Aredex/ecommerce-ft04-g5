import axios from "axios";

export default async function search(name) {
  return axios
    .get(`http://localhost:3001/products/search?name=${name}`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}
