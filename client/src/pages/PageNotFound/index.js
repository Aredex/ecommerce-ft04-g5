import React from 'react'
import style from "./index.module.scss";
import notFound from 'assets/notFound.svg';

function PageNotFound() {
  return (
    <div className={style.page}>
      <img src={notFound} alt="" />
      <h2>Ups!</h2>
      <h3>Página no encontrada</h3>
    </div>
  )
}

export default PageNotFound
