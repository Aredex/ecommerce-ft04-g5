import { useEffect } from "react";
import { useLocalStorage } from "react-use";
import { useDispatch } from "react-redux";
import { signin } from "services/auth";
import { getUser } from "store/Actions/Users/UsersActions";
import Axios from "axios";

export default function useUser() {
  const [localUser, setLocalUser, removeLocalUser] = useLocalStorage(
    "user",
    undefined
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (localUser) {
      if (localUser.token) {
        Axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localUser.token}`;
      }
    }
    console.log("localUser", localUser);
    dispatch(getUser(localUser));
  }, [localUser, dispatch]);

  async function loginWithEmail(username, password) {
    const user = await signin(username, password);
    if (user) setLocalUser(user);
  }

  async function loginWithToken(token) {
    token = token.split("#")[0];
    const { data: user } = await Axios.get("http://localhost:3001/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (user) setLocalUser({ user, token });
  }

  function logOut() {
    removeLocalUser();
  }

  return { localUser, loginWithEmail, loginWithToken, logOut };
}
