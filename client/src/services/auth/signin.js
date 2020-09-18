import axios from "axios";

export default async function signin(username, password) {
    return axios
        .post(`http://localhost:3001/auth/login/email`, { username, password })
        .then((response) => {
            return response.data;
        })
        .catch(() => {
            return undefined;
        });
}
