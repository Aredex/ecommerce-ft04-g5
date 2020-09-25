import axios from "axios";

export default async function removeOrder(id) {
  return axios
    .delete(`${process.env.REACT_APP_API}/orders/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}

// TODO - importante para usar - ELIMINA UNA ORDEN
// * RECOMIENDO USARLO PARA VACIAR UNA ORDEN TAMBIÉN