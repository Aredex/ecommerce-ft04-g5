import axios from "axios";

export default async function remove(id) {
  return axios
    .delete(`${process.env.API}/categories/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}
