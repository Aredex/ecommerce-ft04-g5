import React, { useMemo } from 'react'
import style from "./index.module.scss";


function Card({ order, children }) {
  const firstSixDigits = useMemo(() => {
    if (order)
      if (order.card_first_six_digits)
        return order.card_first_six_digits.split('')
    return undefined
  }, [order])
  const lastFourDigits = useMemo(() => {
    if (order)
      if (order.card_last_four_digits)
        return order.card_last_four_digits.split('')
    return undefined
  }, [order])
  function getClassCard(cardId) {
    switch (cardId) {
      case 'master': return style.master
      case 'visa': return style.visa
      case 'oca': return style.oca
      case 'diners': return style.diners
      default: return ''
    }
  }
  return (
    <div className={[style.creditCard, getClassCard(order.payment_method_id)].join(' ')}>
      {firstSixDigits && <div className={style.cardNumber}>
        <div className={style.group}>
          <span>{firstSixDigits[0]}</span>
          <span>{firstSixDigits[1]}</span>
          <span>{firstSixDigits[2]}</span>
          <span>{firstSixDigits[3]}</span>
        </div>
        <div className={style.group}>
          <span>{firstSixDigits[4]}</span>
          <span>{firstSixDigits[5]}</span>
          <span>*</span>
          <span>*</span>
        </div>
        <div className={style.group}>
          <span>*</span>
          <span>*</span>
          <span>*</span>
          <span>*</span>
        </div>
        <div className={style.group}>
          <span>{lastFourDigits[0]}</span>
          <span>{lastFourDigits[1]}</span>
          <span>{lastFourDigits[2]}</span>
          <span>{lastFourDigits[3]}</span>
        </div>
      </div>}
      {order.payment_method_id === 'visa' && <img className={style.cardLogo} src="https://cdn.visa.com/cdn/assets/images/logos/visa/logo.png" alt="" />}
      {order.payment_method_id === 'master' && <img className={style.cardLogo} src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" alt="" />}
      {order.payment_method_id === 'oca' && <img className={style.cardLogo} src="https://www.oca.com.uy/imagenes/frontend/logo.png" alt="" />}
      {order.payment_method_id === 'diners' && <img className={style.cardLogo} src="http://www.dinersclub.com.ar/assets/images/layout/diners.png" alt="" />}
      {children}
    </div>
  )
}

export default Card
