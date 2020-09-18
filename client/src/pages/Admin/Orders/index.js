import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import CRUD from "./CRUD"
import * as actionsOrders from "store/Actions/Orders";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { removeOrder } from "services/orders"

const Orders = ({state, getAllOrdersAction, removeOrderAction, disabledCRUD}) => { 
const history = useHistory();
useEffect(() => {
    getAllOrdersAction();
  }, []);

  useEffect(() => {
    getAllOrdersAction();
  }, [state.orderReadOnly,
  state.orderUpdate,
  state.orderDetail,
  state.orderRemove]);

  const orders = state.allOrders
  const bandera = {
    readOnly: state.orderReadOnly,
    update: state.orderUpdate,
    detail: state.orderDetail,
    remove: state.orderRemove
  }

  const handleRemove = async (id) => {
    var r = window.confirm(`Desea eliminar ${id}`);
    if (r === true) {
      await removeOrderAction(id);
      disabledCRUD();
  
    }
  }



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
                <button >
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  onClick={() => handleRemove(id)}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>{" "}
              </td>              




              </tr>
            ))}
        </tbody>
      </table>
      {(bandera.readOnly || bandera.update || bandera.create) && (
        //condicional para visualizacion del CRUD
        <CRUD
          onClose={() => disabledCRUD()}          
          orders={state.categoryId}          
        />
      )}
    </section>
  );
};


function mapStateToProps(state) {
  return {
    state: state.orders_reducer
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionsOrders, dispatch)
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
 
