import axios from "axios";

export default async function setFinalizedOrder(idOrder) {
  return axios
    .put(`${process.env.REACT_APP_API}/orders/${idOrder}/finalized`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}