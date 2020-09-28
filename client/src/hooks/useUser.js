import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "services/auth";
import { getUser } from "store/Actions/Users/UsersActions";
import Axios from "axios";
import ReactGA from 'react-ga';
import useOrders from "./useOrders";

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
        ReactGA.set({ userId: localUser.user.id })
      } else {
        Axios.defaults.headers.common[
          "Authorization"
        ] = ``;
        ReactGA.set({ userId: undefined })
      }
    } else {
      Axios.defaults.headers.common[
        "Authorization"
      ] = ``;
      ReactGA.set({ userId: undefined })
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
    dispatch(getUser(user));
    ReactGA.set({ userId: user.user.id })
  }

  async function loginWithToken(token) {
    token = token.split("#")[0];
    const { data: user } = await Axios.get(`${process.env.REACT_APP_API}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (user) setLocalUser({ user, token });
  }

  async function register(name, email, password) {
    const { data: user } = await Axios.post(`${process.env.REACT_APP_API}/auth/register`, {
      name,
      email,
      password,
    });
    if (user) setLocalUser(user);
  }

  async function updateUserData(user) {
    const { data } = await Axios.put(`${process.env.REACT_APP_API}/users/${user.id}`, user);
    if (data) setLocalUser({ ...localUser, user: data });
  }

  function logOut() {
    removeLocalUser();
  }

  return { localUser, register, loginWithEmail, loginWithToken, logOut, isAdmin, userLogin, updateUserData };
}
