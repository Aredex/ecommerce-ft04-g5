import React from "react";
import { Formik } from "formik";
import style from "./CRUD.module.scss";
import InputField from "components/InputField";
import TextareaField from "components/TextareaField";
import Modal from "components/Modal";
import TagField from "components/TagField";

const CRUD = ({ formikData, onClose, onSubmit, estado }) => {
  const prefixStyle = { width: "8rem" };
  return (
    <Formik
      initialValues={formikData}
      onSubmit={onSubmit}
    >
      {({ values, handleSubmit }) => (
        <Modal>
          <Modal.Header>
            <>
              {estado.readOnly && `${values.name}`}
              {estado.update && `Modificar ${values.name}`}
              {estado.create && "Crear nuevo producto"}
            </>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit} className={style.form}>
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
              <InputField
                prefix="Precio"
                prefixStyle={prefixStyle}
                inputPrefix="$"
                name="price"
                readOnly={estado.readOnly}
              />
              <InputField
                prefix="Stock"
                prefixStyle={prefixStyle}
                inputSufix="unidades"
                name="stock"
                readOnly={estado.readOnly}
              />
              {estado.create && (
                <>
                  <InputField
                    prefix="URL de imagen"
                    name="imageUrl"
                    prefixStyle={prefixStyle}
                    readOnly={estado.readOnly}
                  />
                </>
              )}
              <TagField
                prefix="Categorías"
                name="categories"
                placeholder="agregar categoría"
                readOnly={estado.readOnly}
                suggestions={estado.suggestions}
                suggestionProp="name"
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
