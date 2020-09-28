import Axios from 'axios';
import Card from 'components/Card'
import ReviewButton from 'components/ReviewButton';
import useUser from 'hooks/useUser';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import style from "./index.module.scss";

function Review({ product, onUpdate }) {
  return <div className={style.product}>
    <span className={style.productName}>{product.name}</span>
    <ReviewButton className={style.reviewButton} reviews={product.reviews} idProduct={product.id} calificate onUpdate={onUpdate} />
  </div>
}

function Reviews() {
  const [products, setOrders] = useState()
  const { userLogin } = useUser()
  const getOrders = useCallback(async () => {
    const { data } = await Axios.get(`${process.env.REACT_APP_API}/orders/user/me`)
    setOrders(data)
  }, [])
  const withtReview = useMemo(() => {
    if (Array.isArray(products)) {
      const result = products.filter(product => product.reviews.find(review => review.userId === userLogin.user.id))
      return result.length > 0 ? result : undefined
    } return undefined
  }, [products, userLogin])
  const withoutReview = useMemo(() => {
    if (Array.isArray(products)) {
      if (withtReview) {
        const result = products.reduce((result, product) => {
          if (withtReview.find(item => item.id === product.id)) return result;
          else return [...result, product]
        }, [])
        return result.length > 0 ? result : undefined
      } return products
    } return undefined
  }, [products, withtReview])
  useEffect(() => {
    getOrders()
  }, [getOrders])
  return (
    <div className={style.reviewPage}>
      {withoutReview &&
        <Card className={style.reviewCard}>
          <Card.Header>
            Opina sobre estos artículos...
        </Card.Header>
          <Card.Body>
            {withoutReview.map(product => <Review key={product.id} product={product} onUpdate={getOrders} />)}
          </Card.Body>
        </Card>
      }
      {withtReview &&
        <Card className={style.reviewCard}>
          <Card.Header>
            Artículos de los que opinaste
        </Card.Header>
          <Card.Body>
            {withtReview.map(product => <Review key={product.id} product={product} onUpdate={getOrders} />)}
          </Card.Body>
        </Card>
      }
    </div>
  )
}

export default Reviews
