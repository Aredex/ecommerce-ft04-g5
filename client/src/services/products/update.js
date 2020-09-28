import axios from "axios";

export default async function update(id, name, description, price, stock, imageUrl) {
  return axios
    .put(`${process.env.REACT_APP_API}/products/${id}`, {
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
