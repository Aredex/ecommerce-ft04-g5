import React from "react";
import { useFormik } from "formik";
import style from "./CRUD.module.scss";

const CRUD = ({ formikData, onClose }) => {
  const formik = useFormik({
    initialValues: formikData.initialValues,
    onSubmit: formikData.onSubmit,
  });
  return (
    <form onSubmit={formik.handleSubmit} className={style.form}>
      <label>Nombre</label>
      <input
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        readOnly={formikData.readOnly}
      />
      <label>Descripción</label>
      <textarea
        name="description"
        value={formik.values.description}
        onChange={formik.handleChange}
        readOnly={formikData.readOnly}
      />
      <label>Precio</label>
      <br />
      {formikData.readOnly && (
        <button type="button" className={"style.btnDefault"} onClick={onClose}>
          Cerrar
        </button>
      )}
      {formikData.update && (
        <>
          <button
            type="button"
            className={"style.btnDefault"}
            onClick={onClose}
          >
            Cancelar
          </button>
          <button type="submit" className={"style.btnSuccess"}>
            Actualizar
          </button>
        </>
      )}
      {formikData.create && (
        <>
          <button
            type="button"
            className={"style.btnDefault"}
            onClick={onClose}
          >
            Cancelar
          </button>
          <button type="submit" className={"style.btnSuccess"}>
            Crear
          </button>
        </>
      )}
    </form>
  );
};

export default CRUD;
