import axios from "axios";

export default async function update(id, status, address) {
  return axios
    .put(`http://localhost:3001/orders/${id}`, { status, address })
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}
