import axios from "axios";

export default async function create(name, description) {
  return axios
    .post(`${process.env.API}/categories`, { name, description })
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}
