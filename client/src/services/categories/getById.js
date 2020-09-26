import axios from "axios";

export default async function getById(id) {
  return axios
    .get(`${process.env.REACT_APP_API}/categories/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      if (err.response) {
        // client received an error response (5xx, 4xx)
      } else if (err.request) {
        // client never received a response, or request never left
      } else {
        // anything else
      }
    });
}
