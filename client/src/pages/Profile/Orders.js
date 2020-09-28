import Axios from 'axios';
import Card from 'components/Card';
import StepBar from 'components/StepBar';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import style from "./index.module.scss";
import CreditCard from "./Card";

const stepData = [
  { label: 'pendiente de pago', value: 'PENDING_PAYMENT' },
  { label: 'confirmada', value: 'CONFIRMED' },
  { label: 'en preparación', value: 'PREPARING' },
  { label: 'enviada', value: 'SENT' },
  { label: 'recibida', value: 'DELIVERED' }
]


function Order({ order, showStatus, toPayment, rejectOrder }) {
  const getTotal = (order) => {
    return order && order.products && Array.isArray(order.products)
      ? order.products.reduce((result, { order_product }) => {
        return result + order_product.price * order_product.amount;
      }, 0)
      : 0;
  };

  const [show, setShow] = useState(false)

  return <div key={order.id} className={style.order} onClick={() => setShow(!show)}>
    {!show ?
      <>
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
        {order.status === 'PENDING_PAYMENT' &&
          <section className={style.pendingActionGroup}>
            <button
              className={style.buttonToPayment}
              onClick={() => toPayment(order)}
            >
              Proceder al pago
        </button>
            <button
              className={style.buttonCancelOrder}
              onClick={() => rejectOrder(order)}
            >
              Cancelar orden
        </button>
          </section>
        }
      </>
      :
      <div className={style.orderDetail}>
        <h2>Detalle de la orden:</h2>
        <section className={style.headerInfo}>
          <div>
            <CreditCard order={order} />
          </div>
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
            <div className={style.status}>
              <label>Estado:</label>
              <span>{`${stepData.find(status => status.value === order.status).label}`}</span>
            </div>
          </div>
        </section>
        <header>
          <label>
            Arículo:
        </label>
          <label>
            Precio:
        </label>
          <label>
            Cantidad:
        </label>
          <label>
            Importe:
        </label>
        </header>
        <main>
          {order.products.map(product =>
            <article key={product.id}>
              <span>{product.name}</span>
              <span>{`$ ${parseFloat(product.order_product.price).toFixed(2)}`}</span>
              <span>{product.order_product.amount}</span>
              <span>{`$ ${parseFloat(product.order_product.price * product.order_product.amount).toFixed(2)}`}</span>
            </article>
          )}
        </main>
      </div>}
  </div>
}

function Orders() {

  const [orders, setOrders] = useState()

  const getOrders = useCallback(async () => {
    let { data } = await Axios.get(`${process.env.REACT_APP_API}/users/me/orders`)
    if (Array.isArray(data)) {
      data = data.filter(order => order.status !== 'IN CREATION' && order.status !== 'REJECTED')
    }
    data = data.sort((a, b) => {
      if (a.createdAt > b.createdAt) return -1
      if (a.createdAt < b.createdAt) return 1
      return 0
    })
    setOrders(data)
  }, [])

  const toPayment = useCallback((order) => {
    window.location = order.init_point
  }, [])

  const rejectOrder = useCallback(async (order) => {
    await Axios.put(`${process.env.REACT_APP_API}/orders/${order.id}/rejected`)
    await getOrders()
  }, [getOrders])

  useEffect(() => {
    getOrders()
  }, [getOrders])

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

  return (
    <div className={style.orderPage}>
      <Card className={style.ordersCard}>
        <Card.Header>
          ultimas 5 ordenes
        </Card.Header>
        <Card.Body>
          {lastOrders && lastOrders.map(order =>
            <Order key={order.id} order={order} showStatus toPayment={toPayment} rejectOrder={rejectOrder} />
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
              <Order key={order.id} order={order} toPayment={toPayment} rejectOrder={rejectOrder} />
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
