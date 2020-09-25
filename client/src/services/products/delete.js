import axios from "axios";

export default async function remove(id) {
  return axios
    .delete(`${process.env.REACT_APP_API}/products/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}
