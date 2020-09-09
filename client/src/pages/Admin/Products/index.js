import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import CRUD from "./CRUD";
import * as actionsProducts from "store/Actions/Products/ProductsActions"
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'


const Products = (props) => {

  useEffect(() => {
    props.getProducts();
  }, []);

  useEffect(() => {
    props.getProducts();
  }, [props.state.productReadOnly,
  props.state.productUpdate,
  props.state.productCreate,
  props.state.productRemove]);

  const products = props.state.productCards
  const bandera = {
    readOnly: props.state.productReadOnly,
    update: props.state.productUpdate,
    create: props.state.productCreate,
    suggestions: props.state.suggestions
  }

  const handleView = async (id) => {
    await props.handleViewProduct(id)
  };
  const handleUpdate = async (id) => {
    await props.handleUpdateProduct(id)
  };
  const handleCreate = async () => {
    await props.handleCreateProduct()
  };
  const handleDelete = async (id, name) => {
    var r = window.confirm(`Desea eliminar ${name}`);
    if (r === true) {
      await props.removeProduct(id)
    }
    props.disabledProductCRUD()

  };

  var onSubmit
  if (bandera) {
    if (bandera.update) {
      onSubmit = (values) => {
        const { name, description, price, stock, categories } = values;
        props.updateProduct(props.state.productDetail.id, name, description, price, stock);
        for (const category of categories) {
          if (!props.state.productDetail.categories.includes(category))
            props.addCategoryProduct(props.state.productDetail.id, category.id);
        }
        for (const category of props.state.productDetail.categories) {
          if (!categories.includes(category))
            props.removeCategoryProduct(props.state.productDetail.id, category.id);
        }
        props.disabledProductCRUD()
      }
    }
    if (bandera.readOnly) {
      onSubmit = () => {
        props.disabledProductCRUD()
      }
    }
    if (bandera.create) {
      onSubmit = (values) => {
        let { name, description, price, stock, imageUrl, categories } = values;
        imageUrl = imageUrl
          ? imageUrl.length > 0
            ? imageUrl
            : undefined
          : undefined;
        props.createProduct(name, description, price, stock, imageUrl)
        if (categories.length > 0) {
          for (const category of categories) {
            props.addCategoryProduct(props.state.productDetail.id, category.id);
          }
        }
        props.disabledProductCRUD()
      }
    }
  }

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
      {(bandera.readOnly || bandera.update || bandera.create) && (
        <CRUD
          formikData={props.state.productDetail}
          onClose={() => props.disabledProductCRUD()}
          onSubmit={onSubmit}
          estado={bandera}
        />
      )}
    </section>
  );
};

function mapStateToProps(state) {
  return {
    state: state.ProductsReducer
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionsProducts, dispatch)
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);