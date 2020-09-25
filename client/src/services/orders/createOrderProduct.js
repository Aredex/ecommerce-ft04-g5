import axios from "axios";

export default async function createOrderProduct(products, idUser) {
  return axios
    .post(`${process.env.API}/orders/products`, { products, idUser })
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}

// TODO - importante para usar - CREA UNA ORDEN Y LE AGREGA TODOS LOS PRODUCTOS
