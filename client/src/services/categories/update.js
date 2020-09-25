import axios from "axios";

export default async function update(id, name, description) {
  return axios
    .put(`${process.env.API}/categories/${id}`, { name, description })
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}
