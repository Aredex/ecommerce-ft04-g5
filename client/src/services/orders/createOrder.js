import axios from "axios";

export default async function createOrder(address) {
  return axios
    .post(`${process.env.API}/orders`, { address })
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}
