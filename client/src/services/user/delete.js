import axios from "axios";

export default async function remove(id) {
  return axios
    .delete(`${process.env.API}/users/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}