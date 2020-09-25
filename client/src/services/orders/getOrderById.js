import axios from "axios";

export default async function getOrderById(id) {
  return axios
    .get(`${process.env.REACT_APP_API}/orders/${id}`)
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

// TODO - importante para usar - OBTIENE UNA ORDEN SEGUN SU ID