import Axios from 'axios'
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'

function Checkout() {
  const shoppingCart = useSelector(state => state.orders.shoppingCart)
  const toPayment = async (id) => {
    const { data } = await Axios.post(`http://localhost:3001/orders/${id}/toPayment`, {
      "address": "mirasoles sn"
    })
    console.log(data)
    window.location = data.redirect
  }

  return (
    <div>
      <button onClick={() => toPayment(shoppingCart.id)}>Proceder al pago</button>
    </div>
  )
}

export default Checkout
