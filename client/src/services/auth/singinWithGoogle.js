import axios from "axios";

export default async function signinWithGoogle() {
    return axios
        .post(`${process.env.REACT_APP_API}/auth/login/google`)
        .then((response) => {
            return response.data;
        })
        .catch(() => {
            return undefined;
        });
}
