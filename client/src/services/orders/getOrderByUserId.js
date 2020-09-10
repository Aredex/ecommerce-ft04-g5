import axios from "axios";

export default async function getOrderByUserId(id) {
  return axios
    .get(`http://localhost:3001/users/${id}/orders`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}
