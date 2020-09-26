import axios from "axios";

export default async function getAllOrders() {
  return axios
    .get(`${process.env.REACT_APP_API}/orders`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}

// TODO - importante para usar - OBTIENE TODAS LAS ORDENES
