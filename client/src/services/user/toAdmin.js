import axios from "axios";

export default async function toAdmin(id) {
  return axios
    .put(`${process.env.REACT_APP_API}/users/${id}/toadmin`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}