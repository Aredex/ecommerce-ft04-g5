import React, { useState } from "react";
import style from "./index.module.scss";

const Categories = () => {
  const [products, setProducts] = useState([
    {
      id: 2,
      name: "palmera",
      description: "son palmeras",
      createdAt: "2020-09-02T00:29:48.133Z",
      updatedAt: "2020-09-02T00:29:48.133Z",
      productCategory: {
        createdAt: "2020-09-02T15:56:12.997Z",
        updatedAt: "2020-09-02T15:56:12.997Z",
        productId: 4,
        categoryId: 2,
      },
    },
    {
      id: 2,
      name: "palmera",
      description: "son palmeras",
      createdAt: "2020-09-02T00:29:48.133Z",
      updatedAt: "2020-09-02T00:29:48.133Z",
      productCategory: {
        createdAt: "2020-09-02T15:56:12.997Z",
        updatedAt: "2020-09-02T15:56:12.997Z",
        productId: 4,
        categoryId: 2,
      },
    },
    {
      id: 2,
      name: "palmera",
      description: "son palmeras",
      createdAt: "2020-09-02T00:29:48.133Z",
      updatedAt: "2020-09-02T00:29:48.133Z",
      productCategory: {
        createdAt: "2020-09-02T15:56:12.997Z",
        updatedAt: "2020-09-02T15:56:12.997Z",
        productId: 4,
        categoryId: 2,
      },
    },
  ]);
  return (
    <section>
      <table className={style.table}>
        <thead>
          <tr>
            <th>Nombre:</th>
            <th>Descripción:</th>
            <th style={{ width: "11rem" }}>
              <button>
                <i className="fas fa-plus"></i> Agregar
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, key) => (
            <tr key={key}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td style={{ display: "flex" }}>
                <button>
                  <i className="fas fa-search"></i>
                </button>
                <button>
                  <i className="fas fa-edit"></i>
                </button>
                <button>
                  <i className="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Categories;
