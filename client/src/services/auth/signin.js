import axios from "axios";

export default async function signin(username, password) {
    return axios
        .post(`${process.env.API}/auth/login/email`, { username, password })
        .then((response) => {
            return response.data;
        })
        .catch(() => {
            return undefined;
        });
}
