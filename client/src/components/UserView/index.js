import React from "react";
import style from "./index.module.scss";
import { useSelector } from "react-redux";


function UserView() {
  const user = useSelector((x) => x.UsersReducer.userLogin)

  return (
    <div className={style.divPrincipal}>
      <p className={style.parrafo1}>
        {user ? (
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/d/d3/User_Circle.png"
            className={user.login ? style.imagen1 : style.imagen2}
          ></img>
        ) : (
            <i className="fa fa-user"></i>
          )}
        <span>
          {user ? "Hola! " + user.name : "Inicia sesion"}
          {!user && (
            <a href="/sign-in" className={style.link1}>
              {" "}
              Ingresá | Registrate
            </a>
          )}
        </span>
      </p>
    </div>
  );
};

export default UserView;
