import axios from "axios";

export default async function getAll() {
  return axios
    .get(`http://localhost:3001/orders`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}

// TODO - importante para usar - OBTIENE TODAS LAS ORDENES