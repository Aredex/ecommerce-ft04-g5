import axios from "axios";

export default async function removeCategoryToProduct(productId, categoryId) {
  return axios
    .delete(
      `${process.env.API}/products/${productId}/category/${categoryId}`
    )
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}
