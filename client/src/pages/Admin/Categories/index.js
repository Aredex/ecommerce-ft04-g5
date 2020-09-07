import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import { getAll, getById, update, create, remove } from "services/categories";
import CRUD from "./CRUD";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [formik, setFormik] = useState();

  useEffect(() => {
    (async () => {
      const result = await getAll();
      setCategories(result);
    })();
  }, []);

  const getValues = async (id) => {
    const result = await getById(id);
    return {
      id: result.id,
      name: result.name,
      description: result.description,
    };
  };

  const handleView = async (id) => {
    setFormik({
      initialValues: await getValues(id),
      readOnly: true,
    });
  };
  const handleUpdate = async (id) => {
    setFormik({
      initialValues: await getValues(id),
      onSubmit: async (values) => {
        const { name, description } = values;
        await update(id, name, description);
        const result = await getAll();
        setCategories(result);
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
      },
      onSubmit: async (values) => {
        const { name, description } = values;
        await create(name, description);
        const result = await getAll();
        setCategories(result);
        setFormik(undefined);
      },
      create: true,
    });
  };
  const handleDelete = async (id, name) => {
    var r = window.confirm(`Desea eliminar ${name}`);
    if (r === true) {
      await remove(id);
      const result = await getAll();
      setCategories(result);
    }
  };

  return (
    <section>
      <table className={style.table}>
        <thead>
          <tr>
            <th>Nombre:</th>
            <th>Descripción:</th>
            <th style={{ width: "11rem" }}>
              <button onClick={() => handleCreate()}>
                <i className="fas fa-plus"></i> Agregar
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, key) => (
            <tr key={key}>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td style={{ display: "flex" }}>
                <button onClick={() => handleView(category.id)}>
                  <i className="fas fa-search"></i>
                </button>
                <button onClick={() => handleUpdate(category.id)}>
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  onClick={() => handleDelete(category.id, category.name)}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {formik && (
        <CRUD formikData={formik} onClose={() => setFormik(undefined)} />
      )}
    </section>
  );
};

export default Categories;
