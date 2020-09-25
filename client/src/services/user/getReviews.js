import axios from "axios";

export default async function getReviews(id) {
  return axios
    .get(`${process.env.API}/users/${id}/reviews`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}