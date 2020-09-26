import React, { useEffect, useState } from 'react'
import style from './index.module.scss'
import draw from 'assets/paymentCancel.svg'
import { useHistory } from 'react-router'
import useQuery from 'hooks/useQuery'
import useOrders from 'hooks/useOrders'
import { getOrderById } from 'services/orders'

function Success() {
  const { push } = useHistory()
  const { order } = useQuery()
  const { reloadShoppingCart } = useOrders()
  const [init_point, setInit_point] = useState()
  useEffect(() => {
    reloadShoppingCart();
    (async () => {
      const order_data = await getOrderById(order);
      setInit_point(order_data[0].init_point)
    })()
  }, [])
  return (
    <div className={style.page} style={{ display: 'flex', flexDirection: 'column' }}>
      <img src={draw} alt="" className={style.draw} />
      <span className={style.title}>Upss!!!</span>
      <span className={style.subtitle}>Tu pago no fué procesado, pero puedes volver a intentarlo...</span>
      {init_point && <button
        className={style.buttonToHome}
        onClick={() => window.location = init_point}
      >
        reintentar el pago
      </button>}
    </div>
  )
}

export default Success
