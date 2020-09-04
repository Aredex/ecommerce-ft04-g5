import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import getAll from "services/products/getAll";
import CRUD from "./CRUD";
import getById from "services/products/getById";
import update from "services/products/editar";
import create from "services/products/create";
import remove from "services/products/delete";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [formik, setFormik] = useState();

  useEffect(() => {
    (async () => {
      const result = await getAll();
      setProducts(result);
    })();
  }, []);

  const getValues = async (id) => {
    const result = await getById(id);
    return {
      id: result.id,
      name: result.name,
      description: result.description,
      price: result.price,
      stock: result.stock,
    };
  };
  const handleView = async (id) => {
    setFormik({
      initialValues: await getValues(id),
      onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
      },
      readOnly: true,
    });
  };
  const handleUpdate = async (id) => {
    setFormik({
      initialValues: await getValues(id),
      onSubmit: async (values) => {
        const { name, description, price, stock } = values;
        await update(id, name, description, price, stock);
        const result = await getAll();
        setProducts(result);
        setFormik(undefined);
      },
      update: true,
    });
  };
  const handleCreate = async () => {
    setFormik({
      initialValues: {
        name: "",
        description: "",
        price: 0,
        stock: 0,
        imageUrl: "",
      },
      onSubmit: async (values) => {
        let { name, description, price, stock, imageUrl } = values;
        imageUrl = imageUrl
          ? imageUrl.length > 0
            ? imageUrl
            : undefined
          : undefined;
        await create(name, description, price, stock, imageUrl);
        const result = await getAll();
        setProducts(result);
        setFormik(undefined);
      },
      create: true,
    });
  };
  const handleDelete = async (id, name) => {
    var r = window.confirm(`Desea eliminar ${name}`);
    if (r == true) {
      await remove(id);
      const result = await getAll();
      setProducts(result);
    }
  };
  return (
    <section>
      <table className={style.table}>
        <thead>
          <tr>
            <th>Nombre:</th>
            <th>Descripción:</th>
            <th>Precio:</th>
            <th>Stock:</th>
            <th style={{ width: "11rem" }}>
              <button onClick={() => handleCreate()}>
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
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td style={{ display: "flex" }}>
                <button onClick={() => handleView(product.id)}>
                  <i className="fas fa-search"></i>
                </button>
                <button onClick={() => handleUpdate(product.id)}>
                  <i className="fas fa-edit"></i>
                </button>
                <button onClick={() => handleDelete(product.id, product.name)}>
                  <i className="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {formik && (
        <div className={style.modal}>
          <CRUD formikData={formik} onClose={() => setFormik(undefined)} />
        </div>
      )}
    </section>
  );
};

export default Products;
