import Axios from 'axios';
import Card from 'components/Card';
import StepBar from 'components/StepBar';
import React, { useEffect, useMemo, useState } from 'react'
import style from "./index.module.scss";

const stepData = [
  { label: 'pendiente de pago', value: 'PENDING_PAYMENT' },
  { label: 'confirmada', value: 'CONFIRMED' },
  { label: 'en preparación', value: 'PREPARING' },
  { label: 'enviada', value: 'SENT' },
  { label: 'recibida', value: 'DELIVERED' }
]


function Order({ order, showStatus }) {

  const getTotal = (order) => {
    return order && order.products && Array.isArray(order.products)
      ? order.products.reduce((result, { order_product }) => {
        return result + order_product.price * order_product.amount;
      }, 0)
      : 0;
  };

  return <div key={order.id} className={style.order}>
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
    {showStatus && <StepBar value={order.status} steps={stepData} />}
  </div>
}

function Orders() {

  const [orders, setOrders] = useState()

  useEffect(() => {
    (async () => {
      let { data } = await Axios.get(`${process.env.REACT_APP_API}/users/me/orders`)
      console.log(data)
      if (Array.isArray(data))
        data = data.sort((a, b) => {
          if (a.createdAt > b.createdAt) return -1
          if (a.createdAt < b.createdAt) return 1
          return 0
        })
      setOrders(data)
    })()
  }, [])

  const lastOrders = useMemo(() => {
    return orders ? orders.slice(0, 5) : undefined
  }, [orders])

  const pendingPayment = useMemo(() => {
    if (!orders) return undefined
    const result = orders.filter(order => order.status === 'PENDING_PAYMENT')
    return result.length > 0 ? result : undefined
  }, [orders])

  const confirmed = useMemo(() => {
    if (!orders) return undefined
    const result = orders.filter(order => order.status === 'CONFIRMED')
    return result.length > 0 ? result : undefined
  }, [orders])

  const preparing = useMemo(() => {
    if (!orders) return undefined
    const result = orders.filter(order => order.status === 'PREPARING')
    return result.length > 0 ? result : undefined
  }, [orders])

  const sent = useMemo(() => {
    if (!orders) return undefined
    const result = orders.filter(order => order.status === 'SENT')
    return result.length > 0 ? result : undefined
  }, [orders])

  const delivered = useMemo(() => {
    if (!orders) return undefined
    const result = orders.filter(order => order.status === 'DELIVERED')
    return result.length > 0 ? result : undefined
  }, [orders])

  console.log(sent)

  return (
    <div className={style.orderPage}>
      <Card className={style.ordersCard}>
        <Card.Header>
          ultimas 5 ordenes
        </Card.Header>
        <Card.Body>
          {lastOrders && lastOrders.map(order =>
            <Order key={order.id} order={order} showStatus />
          )}
        </Card.Body>
      </Card>
      {pendingPayment &&
        <Card className={style.ordersCard}>
          <Card.Header>
            ordenes pendientes de pago
          </Card.Header>
          <Card.Body>
            {pendingPayment.map(order =>
              <Order key={order.id} order={order} />
            )}
          </Card.Body>
        </Card>
      }
      {confirmed &&
        <Card className={style.ordersCard}>
          <Card.Header>
            ordenes confirmadas
        </Card.Header>
          <Card.Body>
            {confirmed.map(order =>
              <Order key={order.id} order={order} />
            )}
          </Card.Body>
        </Card>
      }
      {preparing &&
        <Card className={style.ordersCard}>
          <Card.Header>
            ordenes en preparación
        </Card.Header>
          <Card.Body>
            {preparing.map(order =>
              <Order key={order.id} order={order} />
            )}
          </Card.Body>
        </Card>
      }
      {sent &&
        <Card className={style.ordersCard}>
          <Card.Header>
            ordenes enviadas
        </Card.Header>
          <Card.Body>
            {sent.map(order =>
              <Order key={order.id} order={order} />
            )}
          </Card.Body>
        </Card>
      }
      {delivered &&
        <Card className={style.ordersCard}>
          <Card.Header>
            ordenes recibidas
        </Card.Header>
          <Card.Body>
            {delivered.map(order =>
              <Order key={order.id} order={order} />
            )}
          </Card.Body>
        </Card>
      }
    </div>
  )
}

export default Orders
