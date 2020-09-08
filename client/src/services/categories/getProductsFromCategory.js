import axios from "axios";
import getById from "services/products/getById";

export default async function getProductsFromCategory(id) {
  try {
    const response = await axios.get(
      `http://localhost:3001/categories/${id}/products`
    );
    const resultData = [];
    for (const product of response.data) {
      resultData.push(await getById(product.id));
    }
    return resultData;
  } catch (err) {
    console.log(err);
    if (err.response) {
      // client received an error response (5xx, 4xx)
      console.log(err.response);
    } else if (err.request) {
      // client never received a response, or request never left
    } else {
      // anything else
    }
  }
}
