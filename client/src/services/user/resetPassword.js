import axios from "axios";

export default async function resetPassword(password,token) {
  return axios
    .put(`http://localhost:3001/users/reset/resetpassword`,{newPassword:password , token})
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}