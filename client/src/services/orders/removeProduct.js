import axios from "axios";

export default async function removeProduct(idOrder, idProduct) {
  return axios
    .delete(`${process.env.API}/orders/${idOrder}/product/${idProduct}`)
    .then((respose) => {
      return respose.data;
    })
    .catch(() => {
      return undefined;
    });
}

// TODO - importante para usar - ELIMINA UN PRODUCTO DE UNA ORDEN