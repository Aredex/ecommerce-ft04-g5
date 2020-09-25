import axios from "axios";

export default async function getAllOrders() {
  return axios
    .get(`${process.env.API}/orders`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}

// TODO - importante para usar - OBTIENE TODAS LAS ORDENES
