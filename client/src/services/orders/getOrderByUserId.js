import axios from "axios";

export default async function getOrderByUserId(idUser) {
    return axios
        .get(`${process.env.API}/users/${idUser}/orders`)
        .then((response) => {
            return response.data;
        })
        .catch(() => {
            return undefined;
        });
}

// TODO - importante para usar - OBTIENE TODAS LAS ORDENES DE UN USUARIO DADO SU ID
