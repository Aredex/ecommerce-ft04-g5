import axios from "axios";

export default async function setEmptyOrder(idOrder) {
  return axios
    .delete(`${process.env.REACT_APP_API}/orders/${idOrder}/empty`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}
