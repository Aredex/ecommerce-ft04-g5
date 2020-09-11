import axios from "axios";

export default async function setRejectOrder(idOrder, address) {
  return axios
    .put(`http://localhost:3001/orders/${idOrder}/rejected`, { address })
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}

// TODO - importante para usar - PONE COMO REJECTED UNA ORDEN
