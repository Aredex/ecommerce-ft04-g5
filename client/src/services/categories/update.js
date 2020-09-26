import axios from "axios";

export default async function update(id, name, description) {
  return axios
    .put(`${process.env.REACT_APP_API}/categories/${id}`, { name, description })
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}
