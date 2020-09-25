import axios from "axios";

export default async function signinWithGoogle() {
    return axios
        .post(`${process.env.API}/auth/login/google`)
        .then((response) => {
            return response.data;
        })
        .catch(() => {
            return undefined;
        });
}
