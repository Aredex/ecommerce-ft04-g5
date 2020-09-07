import React from "react";
import { Formik } from "formik";
import style from "./CRUD.module.scss";
import InputField from "components/InputField";
import TextareaField from "components/TextareaField";
import Modal from "components/Modal";

const CRUD = ({ formikData, onClose }) => {
  const prefixStyle = { width: "8rem" };
  return (
    <Formik
      initialValues={formikData.initialValues}
      onSubmit={formikData.onSubmit}
    >
      {({ values, handleSubmit }) => (
        <Modal>
          <Modal.Header>
            <>
              {formikData.readOnly && `${values.name}`}
              {formikData.update && `Modificar ${values.name}`}
              {formikData.create && "Crear nueva categoría"}
            </>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit} className={style.form}>
              {" "}
              <InputField
                prefix="Nombre"
                prefixStyle={prefixStyle}
                name="name"
                readOnly={formikData.readOnly}
              />
              <TextareaField
                prefix="Descripción"
                name="description"
                readOnly={formikData.readOnly}
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <>
              {formikData.readOnly && (
                <button type="button" onClick={onClose}>
                  Cerrar
                </button>
              )}
              {formikData.update && (
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
              {formikData.create && (
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
