import axios from "axios";

export default async function create(
  name,
  description,
  price,
  stock,
  imageUrl
) {
  return axios
    .post(`http://localhost:3001/products`, {
      name,
      description,
      price,
      stock,
      imageUrl,
    })
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}
