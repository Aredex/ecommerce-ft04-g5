import axios from "axios";

export default async function getReviews(id) {
  return axios
    .get(`http://localhost:3001/users/${id}/reviews`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}