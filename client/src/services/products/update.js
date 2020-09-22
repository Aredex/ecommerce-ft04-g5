import axios from "axios";

export default async function update(id, name, description, price, stock, imageUrl) {
  return axios
    .put(`http://localhost:3001/products/${id}`, {
      name,
      description,
      price,
      stock,
      imageUrl
    })
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}
