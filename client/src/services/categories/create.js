import axios from "axios";

export default async function create(name, description) {
  return axios
    .post(`http://localhost:3001/categories`, { name, description })
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}
