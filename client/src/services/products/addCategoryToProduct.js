import axios from "axios";

export default async function addCategoryToProduct(productId, categoryId) {
  return axios
    .put(`http://localhost:3001/products/${productId}/category/${categoryId}`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}
