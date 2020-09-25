import axios from "axios";

export default async function search(name) {
  return axios
    .get(`${process.env.REACT_APP_API}/products/search?name=${name}`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}
