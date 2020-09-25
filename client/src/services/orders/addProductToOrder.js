import axios from "axios";

export default async function addProducToOrder(
  idProduct,
  amount,
  orderId,
  idUser
) {
  return axios
    .post(`${process.env.API}/orders/${orderId}/product/${idProduct}`, {
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
