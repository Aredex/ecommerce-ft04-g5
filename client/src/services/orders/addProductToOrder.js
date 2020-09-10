import axios from "axios";

export default async function addProducToOrder(
  idProduct,
  amount,
  address,
  idUser
) {
  return axios
    .post(`http://localhost:3001/orders/product/${idProduct}`, {
      amount,
      address,
      idUser,
    })
    .then((respose) => {
      return respose.data;
    })
    .catch(() => {
      return undefined;
    });
}
