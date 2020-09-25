import axios from "axios";

export default async function setPrepareOrder(idOrder, address) {
  return axios
    .put(`${process.env.API}/orders/${idOrder}/preparing`, { address })
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}

// TODO - importante para usar - PONE COMO PREPARING UNA ORDEN
