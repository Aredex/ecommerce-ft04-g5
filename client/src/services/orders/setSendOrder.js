import axios from "axios";

export default async function setSendOrder(idOrder) {
  return axios
    .put(`${process.env.REACT_APP_API}/orders/${idOrder}/sent`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}

// TODO - importante para usar - PONE COMO SET UNA ORDEN
