import axios from "axios";

export default async function createOrder(address) {
  return axios
    .post(`http://localhost:3001/orders`, { address })
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}
