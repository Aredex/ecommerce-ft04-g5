import React from "react";
import style from "./index.module.scss";

const userInit = (props) => {
  var props = { login: false, name: "Juan Mercado" };
  return (
    <div className={style.divPrincipal}>
      <img></img>
      <p className={style.parrafo1}>
        {props.login ? "Hola!  " + props.name : "Inicia sesion"}
      </p>
      {!props.login && (
        <a href="/sign-in" className={style.link1}>
          {" "}
          Ingresá | Registrate
        </a>
      )}
    </div>
  );
};

export default userInit;
