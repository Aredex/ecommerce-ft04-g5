import axios from "axios";

export default async function confirmOrder(idOrder, address) {
  return axios
    .put(`http://localhost:3001/orders/${idOrder}/confirmed`, { address })
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}

// TODO - importante para usar - PONE UNA ORDEN COMO CONFIRMED
// * PARA CUANDO SE CONFIRMA LA COMPRA