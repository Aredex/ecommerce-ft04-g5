import axios from "axios";

export default async function toAdmin(id) {
  return axios
    .put(`http://localhost:3001/users/${id}/toadmin`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}