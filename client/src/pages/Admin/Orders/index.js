import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import { getAllOrders } from "services/orders";
import { useHistory } from "react-router";

const Orders = () => {
  var [orders, setOrders] = useState([]);
  const history = useHistory();
  useEffect(() => {
    getAllOrders().then((data) => setOrders(data));
  }, []);

  const[filter,setFilter] = useState("id");
  const[order,setOrder] = useState(true);

  function handleFilter(e){
    e.preventDefault()
    setOrder(!order)
    setFilter(e.target.name); 
    if(filter === "status"){
      orders = order ? orders.sort((a,b)=>a[filter].toUpperCase() > b[filter].toUpperCase()? 1:-1): orders.sort((a,b)=>a[filter].toUpperCase() < b[filter].toUpperCase()? 1:-1);
    }else{
      orders = order ? orders.sort((a,b)=>a[filter] > b[filter]? 1:-1): orders.sort((a,b)=>a[filter] < b[filter]? 1:-1);
    }
  }

  return (
    <section>
      <table className={style.table}>
        <thead>
          <tr>
            <th style={{ width: "3rem" }}><button className={filter === "id" ? order? style.asc: style.desc:null } name ="id"onClick={handleFilter}>Id:</button></th>
            <th><button className={filter === "user" ? order? style.asc: style.desc:null } name ="user"onClick={handleFilter}>Usuario:</button></th>
            <th><button className={filter === "status" ? order? style.asc: style.desc:null } name ="status"onClick={handleFilter}>Estatus:</button></th>
            <th><button className={filter === "creation" ? order? style.asc: style.desc:null } name ="creation"onClick={handleFilter}>F. creacion:</button></th>
            <th><button className={filter === "update" ? order? style.asc: style.desc:null } name ="update"onClick={handleFilter}>F. modificacion:</button></th>
            <th style={{ width: "11rem" }}></th>
          </tr>
        </thead>
        <tbody>
          {orders !== undefined &&
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
