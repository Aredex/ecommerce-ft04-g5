import axios from "axios";

export default async function setOrderToUser(idOrder, idUser) {
  return axios
    .post(`http://localhost:3001/orders/${idOrder}/user/${idUser}`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}

// TODO - importante para usar
// TODO - Agrega una producto a una orden
