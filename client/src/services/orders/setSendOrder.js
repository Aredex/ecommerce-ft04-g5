import axios from "axios";

export default async function setSendOrder(idOrder) {
  return axios
    .put(`http://localhost:3001/orders/${idOrder}/sent`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}

// TODO - importante para usar - PONE COMO SET UNA ORDEN
