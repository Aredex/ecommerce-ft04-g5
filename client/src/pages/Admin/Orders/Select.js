import React, { useState, useEffect } from "react";
import { getAllOrders, setDeliveredOrder } from "services/orders";
import "./Style.scss";

const valores = [
  "IN CREATION",
  "CONFIRMED",
  "REJECTED",
  "PREPARING",
  "SENT",
  "DELIVERED",
  "FINALIZED",
];

export default function Select(props) {
  return (
    <div className="container">
      <select
        onChange={(e) => {
          props.handleChange(e, props.id, props.address, props.i);
        }}
      >
        {valores.map((val, index) => {
          if (props.status === val) {
            return (
              <option
                class="opciones"
                value={`${val}`}
                key={index}
                disabled
                selected
              >
                {val}
              </option>
            );
          } else {
            return (
              <option value={`${val}`} key={index}>
                {val}
              </option>
            );
          }
        })}
      </select>
    </div>
  );
}
