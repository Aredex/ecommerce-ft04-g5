import axios from "axios";

export default async function getById(id) {
  return axios
    .get(`${process.env.API}/users/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}