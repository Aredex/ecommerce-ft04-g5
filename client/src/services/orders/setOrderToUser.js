import axios from "axios";

export default async function sendOrder(idOrder, idUser) {
  return axios
    .post(`http://localhost:3001/orders/${idOrder}/user/${idUser}`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}
