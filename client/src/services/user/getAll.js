import axios from "axios";

export default async function getAll() {
  return axios
    .get(`http://localhost:3001/users`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}