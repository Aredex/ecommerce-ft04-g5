import React, { useEffect } from "react";
import style from "./index.module.scss";
import CRUD from "./CRUD";
import * as actionsCategories from "store/Actions/Categories/CategoriesActions"
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'


const Categories = (props) => {
  useEffect(() => {
    props.getAllCategories()
  }, []);
  useEffect(() => {
    props.getAllCategories()
    console.log("Renderizo")
  }, [props.estado.categoryRemove,
  props.estado.categoryCreate,
  props.estado.categoryReadOnly,
  props.estado.categoryUpdate]);

  const categories = props.estado.categories;
  const bandera = {
    readOnly: props.estado.categoryReadOnly,
    create: props.estado.categoryCreate,
    update: props.estado.categoryUpdate,
  }

  const handleView = async (id) => {
    await props.handleViewCategory(id)
  };
  const handleUpdate = async (id) => {
    await props.handleUpdateCategory(id)
  };
  const handleCreate = async () => {
    await props.handleCreateCategory()
  };
  const handleDelete = async (id, name) => {
    var r = window.confirm(`Desea eliminar ${name}`);
    if (r === true) {
      await props.removeCategory(id);
      props.disabledCRUD()
    }
  }

  var onSubmit
  if (bandera) {
    if (bandera.update) {
      onSubmit = async (values) => {
        await props.updateCategory(values.id, values.name, values.description)
        props.disabledCRUD()
      }
    }
    if (bandera.readOnly) {
      onSubmit = async () => {
        await props.disabledCRUD()
      }
    }
    if (bandera.create) {
      onSubmit = async (values) => {
        await props.createCategory(values.name, values.description)
        props.disabledCRUD()
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
            <th style={{ width: "11rem" }}>
              <button onClick={() => handleCreate()}>
                <i className="fas fa-plus"></i> Agregar
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {categories != undefined && categories.map((category, key) => (
            <tr key={key}>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td style={{ display: "flex" }}>
                <button onClick={() => handleView(category.id)}>
                  <i className="fas fa-search"></i>
                </button>
                <button onClick={() => handleUpdate(category.id)}>
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  onClick={() => handleDelete(category.id, category.name)}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {(bandera.readOnly || bandera.update || bandera.create) && (
        //condicional para visualizacion del CRUD
        <CRUD
          onClose={() => props.disabledCRUD()}
          onSubmit={onSubmit}
          category={props.estado.categoryId}
          estado={bandera}
        />
      )}
    </section>
  );
};

function mapStateToProps(state) {
  return {
    estado: state.CategoriesReducer
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionsCategories, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);