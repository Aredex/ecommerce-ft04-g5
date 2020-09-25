import axios from "axios";

export default async function setUpdateOrder(id, status, address) {
  return axios
    .put(`${process.env.API}/orders/${id}`, { status, address })
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}

// TODO - importante para usar actualiza es status o address de una orden