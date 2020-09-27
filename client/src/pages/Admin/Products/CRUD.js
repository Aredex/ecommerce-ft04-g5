/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import style from "./CRUD.module.scss";
import InputField from "components/InputField";
import TextareaField from "components/TextareaField";
import Modal from "components/Modal";
import TagField from "components/TagField";
import { useForm } from "hooks/useForm";

const CRUD = ({ formikData, onClose, onSubmit, estado }) => {
  const [addingImage, setAddingImage] = useState(false);
  const [{ imageUrl }, handleInputChange, resetImageUrl] = useForm({
    imageUrl: "",
  });

  const isUrl = (url) => {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return regexp.test(url);
  };

  const handleAddImg = (setFieldValue, values) => {
    if (!addingImage) {
      setAddingImage(true);
    }

    if (addingImage && imageUrl.length > 0) {
      if (isUrl(imageUrl)) {
        setFieldValue(
          "imageUrl",
          values.imageUrl ? [...values.imageUrl, imageUrl] : [imageUrl]
        );
      }

      resetImageUrl();
      setAddingImage(false);
    }
  };

  const prefixStyle = { width: "8rem" };
  return (
    <Formik initialValues={formikData} onSubmit={onSubmit}>
      {({ values, handleSubmit, setFieldValue }) => (
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

              <>
                {addingImage && (
                  <div>
                    <InputField
                      prefix="URL de imagen"
                      name="imageUrl"
                      prefixStyle={prefixStyle}
                      readOnly={estado.readOnly}
                      onChange={handleInputChange}
                      value={imageUrl}
                    />
                  </div>
                )}
                <div className={style.imgcontainer}>
                  <div>
                        <i
          className={[
            "far fa-times-circle",
            style.removeButton,
          ].join(" ")}
          onClick={() =>console.log("anda")}/>
                        <img src="https://www.acceseo.com/wp-content/uploads/2020/09/guillermo-villanueva-bonealive.jpg"></img>
                  </div>

                  <div><i
          className={[
            "far fa-times-circle",
            style.removeButton,
          ].join(" ")}
          onClick={() =>console.log("anda")}/><img src="https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg"></img></div>
                  <div><i
          className={[
            "far fa-times-circle",
            style.removeButton,
          ].join(" ")}
          onClick={() =>console.log("anda")}/><img src="https://www.w3schools.com/css/paris.jpg"></img></div>
                  <div><i
          className={[
            "far fa-times-circle",
            style.removeButton,
          ].join(" ")}
          onClick={() =>console.log("anda")}/><img src="https://www.w3schools.com/css/rock600x400.jpg"></img></div>
                  <div><i
          className={[
            "far fa-times-circle",
            style.removeButton,
          ].join(" ")}
          onClick={() =>console.log("anda")}/><img src="https://static.vecteezy.com/system/resources/previews/001/189/527/non_2x/palm-tree-png.png"></img></div>
                  <div><i
          className={[
            "far fa-times-circle",
            style.removeButton,
          ].join(" ")}
          onClick={() =>console.log("anda")}/><img src="https://www.jardineriaon.com/wp-content/uploads/2018/10/jubaea-chilensis-palmera-1024x683.jpg"></img></div>
                  <div><i
          className={[
            "far fa-times-circle",
            style.removeButton,
          ].join(" ")}
          onClick={() =>console.log("anda")}/><img src="https://images-na.ssl-images-amazon.com/images/I/61DHLYtetoL._AC_SY400_.jpg"></img></div>
                  <div><i
          className={[
            "far fa-times-circle",
            style.removeButton,
          ].join(" ")}
          onClick={() =>console.log("anda")}/><img src="https://revista-ambiente.com.ar/wp-content/uploads/2020/02/Caracter%C3%ADsticas-de-las-palmeras-777x437.jpg"></img></div>
                  <div><i
          className={[
            "far fa-times-circle",
            style.removeButton,
          ].join(" ")}
          onClick={() =>console.log("anda")}/><img src="https://www.acceseo.com/wp-content/uploads/2020/09/guillermo-villanueva-bonealive.jpg"></img></div>

                </div>

                <div
                  className={style.primary}
                  onClick={() => handleAddImg(setFieldValue, values)}
                >
                  {addingImage ? "Aceptar" : "Añadir nueva imagen"}
                </div>
              </>

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
