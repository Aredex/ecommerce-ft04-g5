import axios from "axios";

export default async function toGuest(id) {
  return axios
    .put(`http://localhost:3001/users/${id}/toguest`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}