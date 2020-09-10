import axios from "axios";

export default async function removeOrder(id) {
  return axios
    .delete(`http://localhost:3001/orders/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}

// TODO - importante para usar - ELIMINA UNA ORDEN
// * RECOMIENDO USARLO PARA VACIAR UNA ORDEN TAMBIÉN