import React from 'react'
import style from './index.module.scss'
import draw from 'assets/paymentConfirmed.svg'
import { useHistory } from 'react-router'

function Success() {
  const { push } = useHistory()
  return (
    <div className={style.page} style={{ display: 'flex', flexDirection: 'column' }}>
      <img src={draw} alt="" className={style.draw} />
      <span className={style.title}>Felicidades!!!</span>
      <span className={style.subtitle}>Tu compra fue confirmada y será procesada en breve...</span>
      <button
        className={style.buttonToHome}
        onClick={() => push("/")}
      >
        ir a home
      </button>
    </div>
  )
}

export default Success
