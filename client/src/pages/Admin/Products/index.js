import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import getAll from "services/products/getAll";
import { getAll as getCategories } from "services/categories";
import CRUD from "./CRUD";
import getById from "services/products/getById";
import update from "services/products/update";
import create from "services/products/create";
import remove from "services/products/delete";
import addCategoryToProduct from "services/products/addCategoryToProduct";
import removeCategoryToProduct from "services/products/removeCategoryToProduct";
import { getProducts } from "store/Actions/Products/ProductsActions";
import { useDispatch, useSelector } from "react-redux";


const Products = () => {
  const [formik, setFormik] = useState();

  const dispatch = useDispatch();

  const products = useSelector((x) => x.ProductsReducer.productCards);

  useEffect(() => {
    (async () => {
      dispatch(await getProducts());
    })()

  }, []);

  const getValues = async (id) => {
    const result = await getById(id);
    return {
      id: result.id,
      name: result.name,
      description: result.description,
      price: result.price,
      stock: result.stock,
      categories: result.categories
        ? result.categories.map((category) => ({
          id: category.id,
          name: category.name,
          description: category.description,
        }))
        : [],
    };
  };
  const handleView = async (id) => {
    setFormik({
      initialValues: await getValues(id),
      readOnly: true,
    });
  };
  const handleUpdate = async (id) => {
    const initialValues = await getValues(id);
    setFormik({
      initialValues,
      onSubmit: async (values) => {
        const { name, description, price, stock, categories } = values;
        await update(id, name, description, price, stock);
        for (const category of categories) {
          if (!initialValues.categories.includes(category))
            await addCategoryToProduct(id, category.id);
        }
        for (const category of initialValues.categories) {
          if (!categories.includes(category))
            await removeCategoryToProduct(id, category.id);
        }
        dispatch(await getProducts())
        setFormik(undefined);
      },
      update: true,
      suggestions: await getCategories(),
    });
  };
  const handleCreate = async () => {
    setFormik({
      initialValues: {
        name: "",
        description: "",
        price: 1,
        stock: 0,
        imageUrl: "",
        categories: [],
      },
      onSubmit: async (values) => {
        let { name, description, price, stock, imageUrl, categories } = values;
        imageUrl = imageUrl
          ? imageUrl.length > 0
            ? imageUrl
            : undefined
          : undefined;
        const product = await create(name, description, price, stock, imageUrl);
        if (categories.length > 0) {
          for (const category of categories) {
            await addCategoryToProduct(product.id, category.id);
          }
        }
        dispatch(await getProducts())
        setFormik(undefined);
      },
      create: true,
      suggestions: await getCategories(),
    });
  };
  const handleDelete = async (id, name) => {
    var r = window.confirm(`Desea eliminar ${name}`);
    if (r === true) {
      await remove(id);
      dispatch(await getProducts())
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
          {products != undefined && products.map((product, key) => (
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
        <CRUD formikData={formik} onClose={() => setFormik(undefined)} />
      )}
    </section>
  );
};

export default Products;
