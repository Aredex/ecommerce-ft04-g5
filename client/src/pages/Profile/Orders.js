import Axios from 'axios';
import Card from 'components/Card';
import StepBar from 'components/StepBar';
import React, { useEffect, useState } from 'react'
import style from "./index.module.scss";

function Orders() {
  const stepData = [
    { label: 'pendiente de pago', value: 'PENDING_PAYMENT' },
    { label: 'confirmada', value: 'CONFIRMED' },
    { label: 'en preparación', value: 'PREPARING' },
    { label: 'enviada', value: 'SENT' },
    { label: 'recibida', value: 'DELIVERED' }
  ]

  const [orders, setOrders] = useState()
  useEffect(() => {
    (async () => {
      const { data } = await Axios.get(`${process.env.REACT_APP_API}/users/me/orders`)
      setOrders(data)
    })()
  }, [])
  const getTotal = (order) => {
    return order && order.products && Array.isArray(order.products)
      ? order.products.reduce((result, { order_product }) => {
        return result + order_product.price * order_product.amount;
      }, 0)
      : 0;
  };
  console.log(orders)
  return (
    <div className={style.orderPage}>
      <Card>
        <Card.Header>
          ultimas 5 ordenes
        </Card.Header>
        <Card.Body>
          {orders && orders.map(order =>
            <div key={order.id} className={style.order}>
              <div className={style.info}>
                <div>
                  <label>Id:</label>
                  <span>{order.id}</span>
                </div>
                <div>
                  <label>Fecha:</label>
                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div>
                  <label>Importe:</label>
                  <span>{`$ ${parseFloat(getTotal(order)).toFixed(2)}`}</span>
                </div>
              </div>
              <StepBar value={order.status} steps={stepData} />
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  )
}

export default Orders
