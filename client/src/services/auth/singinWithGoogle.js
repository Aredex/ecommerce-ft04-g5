import axios from "axios";

export default async function signinWithGoogle() {
    return axios
        .post(`http://localhost:3001/auth/login/google`)
        .then((response) => {
            return response.data;
        })
        .catch(() => {
            return undefined;
        });
}
