import React from 'react'
import style from "./index.module.scss";
import notFound from 'assets/notFound.svg';

function PageNotFound() {
  return (
    <div>
      <img src={notFound} alt="" />
    </div>
  )
}

export default PageNotFound
