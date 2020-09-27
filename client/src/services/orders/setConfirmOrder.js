import axios from "axios";

export default async function setConfirmOrder(idOrder, address) {
  return axios
    .put(`${process.env.REACT_APP_API}/orders/${idOrder}/confirmed`, { address })
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}

// TODO - importante para usar - PONE UNA ORDEN COMO CONFIRMED
// * PARA CUANDO SE CONFIRMA LA COMPRA