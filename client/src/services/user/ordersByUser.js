import axios from "axios";

export default async function ordersByUser(id) {
  return axios
    .get(`${process.env.REACT_APP_API}/users/${id}/orders`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}