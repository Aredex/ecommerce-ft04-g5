/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import style from "./CRUD.module.scss";
import InputField from "components/InputField";
import TextareaField from "components/TextareaField";
import Modal from "components/Modal";
import TagField from "components/TagField";
import ImagesContainer from "components/ImagesContainer";
import { useForm } from "hooks/useForm";
import ImagesProduct from "components/imagesProduct/ImagesProduct";
import { useDispatch } from "react-redux";
import { startAddingImage } from "Disparchers/productImages";

const CRUD = ({ formikData, onClose, onSubmit, estado }) => {
    const [addingImage, setAddingImage] = useState(false);
    const [firstAddImage, setfirstAddImage] = useState(true);
    const dispatch = useDispatch();

    const [{ imageUrl }, handleInputChange, resetImageUrl] = useForm({
        imageUrl: "",
    });

    const isUrl = (url) => {
        var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
        return regexp.test(url);
    };

    const handleAddImg = (setFieldValue, values) => {
        if (firstAddImage) setfirstAddImage(false);
        if (!addingImage) {
            setAddingImage(true);
        }

        if (addingImage && imageUrl.length > 0) {
            if (isUrl(imageUrl)) {
                setFieldValue(
                    "imageUrl",
                    values.imageUrl
                        ? [...values.imageUrl, imageUrl]
                        : [imageUrl]
                );
                resetImageUrl();
            }
            resetImageUrl();

            setAddingImage(false);
        }
        resetImageUrl();
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

                            {!estado.create && (
                                <ImagesProduct
                                    prefix="Imágenes"
                                    prefixStyle={prefixStyle}
                                    estado={estado}
                                    id={values.id}
                                />
                            )}

                            <>
                                {!firstAddImage && (
                                    <div
                                        className={
                                            addingImage
                                                ? style.imgurl
                                                : style.imgurld
                                        }
                                    >
                                        <InputField
                                            autoComplete="off"
                                            prefix="URL de imagen"
                                            name="imageUrl"
                                            prefixStyle={prefixStyle}
                                            readOnly={estado.readOnly}
                                            onChange={handleInputChange}
                                            value={imageUrl}
                                        />
                                    </div>
                                )}

                                {!estado.readOnly && (
                                    <div
                                        className={style.img}
                                        onClick={() => {
                                            handleAddImg(setFieldValue, values);
                                            if (addingImage) {
                                                dispatch(
                                                    startAddingImage(
                                                        values.id,
                                                        imageUrl
                                                    )
                                                );
                                            }
                                        }}
                                    >
                                        {addingImage
                                            ? "Aceptar"
                                            : "Añadir nueva imagen"}
                                    </div>
                                )}
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
