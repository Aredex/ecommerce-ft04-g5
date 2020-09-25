import axios from "axios";

export default async function create(
  name,
  description,
  price,
  stock,
  imageUrl
) {
  return axios
    .post(`${process.env.REACT_APP_API}/products`, {
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
