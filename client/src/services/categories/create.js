import axios from "axios";

export default async function create(name, description) {
  return axios
    .post(`${process.env.REACT_APP_API}/categories`, { name, description })
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}
