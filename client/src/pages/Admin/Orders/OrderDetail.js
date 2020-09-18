import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router";
import { getOrderById } from "services/orders";
import style from "./OrderDetail.module.scss";
import InputField from "components/InputField";

function OrderDetail() {
  const prefixStyle = { width: "8rem" };
  const InputStyle = { width: "calc(33vw - 5rem)" };
  const [order, setOrder] = useState(undefined);
  const { id } = useParams();
  useEffect(() => {
    getOrderById(id).then((data) => setOrder(data[0]));
  }, [id]);
  const total = useMemo(() => {
    return order && order.products && Array.isArray(order.products)
      ? order.products.reduce((result, { order_product }) => {
        return result + order_product.price * order_product.amount;
      }, 0)
      : 0;
  }, [order]);
  return (
    <div>
      {order && (
        <section>
          <div className={style.row}>
            <InputField
              value={order.id}
              prefix="Orden Nº"
              name="id"
              prefixStyle={prefixStyle}
              readOnly
              style={InputStyle}
            />
          </div>
          <div className={style.row}>
            <InputField
              value={order.user.name}
              prefix="Cliente"
              name="userId"
              prefixStyle={prefixStyle}
              readOnly
              style={InputStyle}
            />
            <InputField
              value={order.address}
              prefix="Dirección"
              name="address"
              prefixStyle={prefixStyle}
              readOnly
              style={InputStyle}
            />
            <InputField
              value={order.status}
              prefix="Status"
              name="status"
              prefixStyle={prefixStyle}
              readOnly
              style={InputStyle}
            />
          </div>
          <div className={style.row}>
            <InputField
              value={new Date(order.createdAt).toLocaleString()}
              prefix="F. creación"
              name="createdAt"
              prefixStyle={prefixStyle}
              readOnly
              style={InputStyle}
            />
            <InputField
              value={new Date(order.updatedAt).toLocaleString()}
              prefix="F. modificación"
              name="updatedAt"
              prefixStyle={prefixStyle}
              readOnly
              style={InputStyle}
            />
            <InputField
              value={`$ ${parseFloat(total).toFixed(2)}`}
              prefix="Total"
              name="total"
              prefixStyle={prefixStyle}
              readOnly
              style={InputStyle}
            />
          </div>
        </section>
      )}
      <section>
        <table className={style.table}>
          <thead>
            <tr>
              <th style={{ width: "3rem" }}>Producto:</th>
              <th></th>
              <th style={{ width: "10rem" }}>Precio:</th>
              <th style={{ width: "10rem" }}>Cantidad:</th>
              <th style={{ width: "10rem" }}>Total:</th>
            </tr>
          </thead>
          <tbody>
            {order?.products !== undefined &&
              order.products.map(({ order_product, name, id }) => (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{`$ ${parseFloat(order_product.price).toFixed(2)}`}</td>
                  <td>{order_product.amount}</td>
                  <td>
                    {`$ ${parseFloat(
                      order_product.price * order_product.amount
                    ).toFixed(2)}`}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default OrderDetail;
