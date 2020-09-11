import React from "react";
import { Formik } from "formik";
import style from "./CRUD.module.scss";
import InputField from "components/InputField";
import TextareaField from "components/TextareaField";
import Modal from "components/Modal";

const CRUD = ({ onClose, onSubmit, category, estado }) => {

  const prefixStyle = { width: "8rem" };

  return (
    <Formik
      initialValues={{
        id: category.id,
        name: category.name,
        description: category.description,
      }}
      onSubmit={onSubmit}
    >
      {({ values, handleSubmit }) => (
        <Modal>
          <Modal.Header>
            <>
              {estado.readOnly && `${values.name}`}
              {estado.update && `Modificar ${values.name}`}
              {estado.create && "Crear nueva categoría"}
            </>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit} className={style.form}>
              {" "}
              <InputField
                prefix="Nombre"
                prefixStyle={prefixStyle}
                name="name"
                readOnly={estado.readOnly}
              />
              <TextareaField
                prefix="Descripción"
                name="description"
                readOnly={estado.readOnly}
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <>
              {estado.readOnly && (
                <button type="button" onClick={onClose}>
                  Cerrar
                </button>
              )}
              {estado.update && (
                <>
                  <button type="button" onClick={onClose}>
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className={style.primary}
                    onClick={handleSubmit}
                  >
                    Actualizar
                  </button>
                </>
              )}
              {estado.create && (
                <>
                  <button type="button" onClick={onClose}>
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className={style.primary}
                    onClick={handleSubmit}
                  >
                    Crear
                  </button>
                </>
              )}
            </>
          </Modal.Footer>
        </Modal>
      )}
    </Formik>
  );
};

export default CRUD;
