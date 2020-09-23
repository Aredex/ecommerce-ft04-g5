import axios from "axios";

export default async function resetPassword(id,password) {
  return axios
    .put(`http://localhost:3001/users/${id}/resetpassword`,{newPassword:password})
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return undefined;
    });
}