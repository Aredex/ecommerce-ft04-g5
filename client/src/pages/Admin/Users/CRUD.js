import React from "react";
import { Formik } from "formik";
import style from "./CRUD.module.scss";
import InputField from "components/InputField";
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
              {formikData.create && "Crear nuevo usuario"}
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
              <InputField
                prefix="Email"
                prefixStyle={prefixStyle}
                name="email"
                readOnly={formikData.readOnly}
              />
              <InputField
                prefix="Role"
                prefixStyle={prefixStyle}
                name="role"
                readOnly
              />
              {formikData.update && values.role === 'GUEST' ? <button
                type="button"
                className={style.primary}
                onClick={formikData.onPromote}
              >
                Promover a ADMIN
                </button> :
                <button
                  type="button"
                  className={style.primary}
                  onClick={formikData.onDegrade}
                >
                  Degradar a GUEST
                </button>}
              {!formikData.readOnly && !formikData.update && (
                <>
                  <InputField
                    prefix="Contraseña"
                    prefixStyle={prefixStyle}
                    name="password"
                    readOnly={formikData.readOnly}
                    type="password"
                  />
                  <InputField
                    prefix="Repetir contraseña"
                    prefixStyle={prefixStyle}
                    name="passwordVerify"
                    readOnly={formikData.readOnly}
                    type="password"
                  />
                </>
              )}
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
