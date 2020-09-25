import axios from "axios";

export default async function getAll() {
  return axios
    .get(`${process.env.API}/categories`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}
