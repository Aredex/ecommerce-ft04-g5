import React from "react";
import style from "./index.module.scss";

function Load() {
  return (
    <>
      <div className={style.load}>
        <span>Cargando...</span>
        <div className={style.loader}></div>
      </div>
    </>
  );
}

export default Load;
