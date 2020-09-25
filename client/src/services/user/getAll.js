import axios from "axios";

export default async function getAll() {
  return axios
    .get(`${process.env.API}/users`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}