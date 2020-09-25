import axios from "axios";

export default async function setDeliveredOrder(idOrder) {
  return axios
    .put(`${process.env.API}/orders/${idOrder}/delivered`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}

// TODO - importante para usar - PONE UNDA ORDEN COMO DELIVERED