import axios from "axios";

export default async function emptyOrder(idOrder) {
  return axios
    .delete(`http://localhost:3001/orders/${idOrder}/empty`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}
