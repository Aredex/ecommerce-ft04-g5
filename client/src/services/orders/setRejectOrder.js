import axios from "axios";

export default async function setRejectOrder(idOrder, address) {
  return axios
    .put(`${process.env.REACT_APP_API}/orders/${idOrder}/rejected`, { address })
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}

// TODO - importante para usar - PONE COMO REJECTED UNA ORDEN
