import axios from "axios";

export default async function signin(username, password) {
    return axios
        .post(`${process.env.REACT_APP_API}/auth/login/email`, { username, password })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            const data = error.response.data
            if (data.message) alert(data.message)
            return undefined;
        });
}
