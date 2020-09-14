import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import { getAllOrders } from "services/orders";
import { useHistory } from "react-router";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const history = useHistory();
  useEffect(() => {
    getAllOrders().then((data) => setOrders(data));
  }, []);

  return (
    <section>
      <table className={style.table}>
        <thead>
          <tr>
            <th style={{ width: "3rem" }}>Id:</th>
            <th>Usuario:</th>
            <th>Status:</th>
            <th>F. creación:</th>
            <th>F. modificación:</th>
            <th style={{ width: "11rem" }}></th>
          </tr>
        </thead>
        <tbody>
          {orders != undefined &&
            orders.map(({ id, userId, status, createdAt, updatedAt }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{userId}</td>
                <td>{status}</td>
                <td>{new Date(createdAt).toLocaleString()}</td>
                <td>{new Date(updatedAt).toLocaleString()}</td>
                <td style={{ display: "flex" }}>
                  <button onClick={() => history.push(`/admin/orders/${id}`)}>
                    <i className="fas fa-search"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
};

export default Orders;
