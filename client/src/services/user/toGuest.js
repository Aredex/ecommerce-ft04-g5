import axios from "axios";

export default async function toGuest(id) {
  return axios
    .put(`${process.env.API}/users/${id}/toguest`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}