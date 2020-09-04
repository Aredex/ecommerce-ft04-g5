import axios from "axios";

export default async function update(id, name, description, price, stock) {
  return axios
    .put(`http://localhost:3001/products/${id}`, {
      name,
      description,
      price,
      stock,
    })
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}
