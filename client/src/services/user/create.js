import axios from "axios";

export default async function create(name, email, password, role) {
  return axios
    .post(`http://localhost:3001/users`, { name, email, password, role })
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}
