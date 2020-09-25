import axios from "axios";

export default async function addCategoryToProduct(productId, categoryId) {
  return axios
    .put(`${process.env.API}/products/${productId}/category/${categoryId}`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}
