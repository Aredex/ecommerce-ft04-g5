import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "services/auth";
import { getUser } from "store/Actions/Users/UsersActions";
import Axios from "axios";

export default function useUser() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [localUser, setLocalUser, removeLocalUser] = useLocalStorage(
    "user",
    undefined
  );
  const userLogin = useSelector((x) => x.UsersReducer.userLogin);

  const dispatch = useDispatch();

  useEffect(() => {
    if (localUser) {
      if (localUser.token) {
        Axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localUser.token}`;
      }
    }
    dispatch(getUser(localUser));
  }, [localUser, dispatch]);

  useEffect(() => {
    if (!userLogin) setIsAdmin(false);
    else if (!userLogin.user) setIsAdmin(false);
    else if (userLogin.user.role !== "ADMIN") setIsAdmin(false);
    else setIsAdmin(true);
  }, [userLogin]);

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

  async function register(name, email, password) {
    const { data: user } = await Axios.post("http://localhost:3001/auth/register", {
      name,
      email,
      password,
    });
    if (user) setLocalUser(user);
  }

  function logOut() {
    removeLocalUser();
  }

  return { localUser, register, loginWithEmail, loginWithToken, logOut, isAdmin, userLogin };
}
