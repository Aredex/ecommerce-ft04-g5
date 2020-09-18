import React from "react";
import { useSelector } from "react-redux";
import useUser from "hooks/useUser";
import style from "./index.module.scss";
import UserDetail from "./UserDetail";

function UserView() {
  const { logOut, localUser: data } = useUser();
  const userLogin = useSelector((x) => x.UsersReducer.userLogin);

  return (
    <div className={style.divPrincipal}>
      <div className={style.parrafo1}>
        {userLogin ? (
          <div>
            <UserDetail name={userLogin.user.name} logOut={logOut} />
          </div>
        ) : (
          <i className="fa fa-user"></i>
        )}

        <span>
          {!userLogin && "Inicia sesion"}
          {!userLogin && (
            <a href="/sign-in" className={style.link1}>
              {" "}
              Ingresá | Registrate
            </a>
          )}
        </span>
      </div>
    </div>
  );
}

export default UserView;
