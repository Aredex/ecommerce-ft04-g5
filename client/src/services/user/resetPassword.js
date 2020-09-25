import axios from "axios";

export default async function resetPassword(password, token) {
  return axios
    .put(`${process.env.REACT_APP_API}/users/reset/resetpassword`, { newPassword: password, token })
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}