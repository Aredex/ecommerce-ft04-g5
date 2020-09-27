import React, { useEffect, useState} from "react";
import style from "./index.module.scss";
import CRUD from "./CRUD";
import * as actionsCategories from "store/Actions/Categories/CategoriesActions"
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'


const Categories = ({ state, disabledCRUD, createCategory, updateCategory,
  removeCategory, getAllCategories, handleViewCategory, handleUpdateCategory,
  handleCreateCategory }) => {

  useEffect(() => {
    getAllCategories()
  }, [getAllCategories]);
  useEffect(() => {
    getAllCategories()
  }, [getAllCategories, state.categoryRemove,
    state.categoryCreate,
    state.categoryReadOnly,
    state.categoryUpdate]);

  var categories = state.categories;
  const bandera = {
    readOnly: state.categoryReadOnly,
    create: state.categoryCreate,
    update: state.categoryUpdate,
  }
  const[filter,setFilter] = useState("name");
  const[order,setOrder] = useState(true);

  const handleView = async (id) => {
    await handleViewCategory(id)
  };
  const handleUpdate = async (id) => {
    await handleUpdateCategory(id)
  };
  const handleCreate = async () => {
    await handleCreateCategory()
  };
  const handleDelete = async (id, name) => {
    var r = window.confirm(`Desea eliminar ${name}`);
    if (r === true) {
      await removeCategory(id);
      disabledCRUD()
    }
  }

  var onSubmit
  if (bandera) {
    if (bandera.update) {
      onSubmit = async (values) => {
        await updateCategory(values.id, values.name, values.description)
        disabledCRUD()
      }
    }
    if (bandera.readOnly) {
      onSubmit = async () => {
        await disabledCRUD()
      }
    }
    if (bandera.create) {
      onSubmit = async (values) => {
        await createCategory(values.name, values.description)
        disabledCRUD()
      }
    }
  }

  function handleFilter(e){
    e.preventDefault()
    setOrder(!order)
    setFilter(e.target.name); 
    categories = order ? categories.sort((a,b)=>a[filter].toUpperCase() > b[filter].toUpperCase()? 1:-1): categories.sort((a,b)=>a[filter].toUpperCase() < b[filter].toUpperCase()? 1:-1);
  }

  return (
    <section>
      <table className={style.table}>
        <thead>
          <tr>
            <th><button 
            className={filter == "name" ? order? style.asc: style.desc:null } 
            name ="name"
            onClick={handleFilter}>Nombre:</button></th>
            <th><button
            className={filter == "description" ? order? style.asc: style.desc:null } 
            name ="description"
            onClick={handleFilter}
            >Descripción:</button></th>
            <th style={{ width: "11rem" }}>
              <button onClick={() => handleCreate()}>
                <i className="fas fa-plus"></i> Agregar
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {categories !== undefined && categories.map((category, key) => (
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
          onClose={() => disabledCRUD()}
          onSubmit={onSubmit}
          category={state.categoryId}
          estado={bandera}
        />
      )}
    </section>
  );
};

function mapStateToProps(state) {
  return {
    state: state.CategoriesReducer
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionsCategories, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);