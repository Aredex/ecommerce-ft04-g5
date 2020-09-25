import axios from "axios";

export default async function update(id, name, email, password, role) {
  return axios
    .put(`${process.env.REACT_APP_API}/users/${id}`, {
      name, email, password, role
    })
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}