import axios from "axios";

export default async function addProducToOrder(
  idProduct,
  amount,
  orderId,
  idUser
) {
  return axios
    .post(`http://localhost:3001/orders/${orderId}/product/${idProduct}`, {
      amount,
      idUser,
    })
    .then((respose) => {
      return respose.data;
    })
    .catch(() => {
      return undefined;
    });
}
