import axios from "axios";

export default async function removeEmptyOrder(id) {
  return axios
    .delete(`${process.env.API}/order/${id}/empty`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}

// PONE UNA ORDEN COMO VACÍA
// ! NO RECOMIENDO USAR ESTE MÉTODO