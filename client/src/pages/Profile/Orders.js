import Card from 'components/Card';
import React from 'react'
import style from "./index.module.scss";

function Orders() {
  return (
    <div>
      <Card>
        <Card.Header>
          ultimas 5 ordenes
        </Card.Header>
        <Card.Body>
          <table>
            <tbody>
              <tr>
                <td>5</td>
                <td>25/10/2020</td>
                <td>entregada</td>
                <td>
                  <div className={style.stepBar}>
                    <div className={style.step}>
                      <span>pendiente de pago</span>
                      <div className={style.dot}>
                        <i className="fas fa-check" />
                      </div>
                    </div>
                    <div className={style.step}>
                      <span>confirmada</span>
                      <div className={style.dot}>
                        <i className="fas fa-check" />
                      </div>
                    </div>
                    <div className={style.step}>
                      <span>en preparación</span>
                      <div className={style.dot}>
                        <i className="fas fa-check" />
                      </div>
                    </div>
                    <div className={style.step}>
                      <span>enviada</span>
                      <div className={style.dot}>
                        <i className="fas fa-check" />
                      </div>
                    </div>
                    <div className={style.step}>
                      <span>entregada</span>
                      <div className={style.dot}>
                        <i className="fas fa-check" />
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Orders
