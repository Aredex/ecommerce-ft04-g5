import React from "react";
import { Formik } from "formik";
import style from "./CRUD.module.scss";
import InputField from "components/InputField";
import TextareaField from "components/TextareaField";
import Modal from "components/Modal";
import TagField from "components/TagField";

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
              {formikData.create && "Crear nuevo producto"}
            </>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit} className={style.form}>
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
              <InputField
                prefix="Precio"
                prefixStyle={prefixStyle}
                inputPrefix="$"
                name="price"
                readOnly={formikData.readOnly}
              />
              <InputField
                prefix="Stock"
                prefixStyle={prefixStyle}
                inputSufix="unidades"
                name="stock"
                readOnly={formikData.readOnly}
              />
              {formikData.create && (
                <>
                  <InputField
                    prefix="URL de imagen"
                    name="imageUrl"
                    prefixStyle={prefixStyle}
                    readOnly={formikData.readOnly}
                  />
                </>
              )}
              <TagField
                prefix="Categorías"
                name="categories"
                placeholder="agregar categoría"
                readOnly={formikData.readOnly}
                suggestions={formikData.suggestions}
                suggestionProp="name"
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
