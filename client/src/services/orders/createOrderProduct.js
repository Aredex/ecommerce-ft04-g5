import axios from "axios";

export default async function createOrderProduct(products) {
  return axios
    .post(`http://localhost:3001/orders/products`, { products })
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}
