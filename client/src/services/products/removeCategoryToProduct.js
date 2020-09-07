import axios from "axios";

export default async function removeCategoryToProduct(productId, categoryId) {
  return axios
    .delete(
      `http://localhost:3001/products/${productId}/category/${categoryId}`
    )
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}
