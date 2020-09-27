import React, { useEffect , useState } from "react";
import style from "./index.module.scss";
import CRUD from "./CRUD";
import * as actionsProducts from "store/Actions/Products/ProductsActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const Products = ({
  state,
  updateProduct,
  createProduct,
  addCategoryProduct,
  removeCategoryProduct,
  disabledProductCRUD,
  removeProduct,
  getProducts,
  handleViewProduct,
  handleUpdateProduct,
  handleCreateProduct,
}) => {
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    getProducts();
  }, [
    getProducts,
    state.productReadOnly,
    state.productUpdate,
    state.productCreate,
    state.productRemove,
  ]);

  const[filter,setFilter] = useState("name");
  const[order,setOrder] = useState(true);

  var products = state.productCards;
  const bandera = {
    readOnly: state.productReadOnly,
    update: state.productUpdate,
    create: state.productCreate,
    suggestions: state.suggestions,
  };

  const handleView = async (id) => {
    await handleViewProduct(id);
  };
  const handleUpdate = async (id) => {
    await handleUpdateProduct(id);
  };
  const handleCreate = async () => {
    await handleCreateProduct();
  };
  const handleDelete = async (id, name) => {
    var r = window.confirm(`Desea eliminar ${name}`);
    if (r === true) {
      await removeProduct(id);
      disabledProductCRUD();
    }
  };

  var onSubmit;
  if (bandera) {
    if (bandera.update) {
      onSubmit = async (values) => {
        const {
          name,
          description,
          price,
          stock,
          categories,
          imageUrl,
        } = values;
        await updateProduct(
          state.productDetail.id,
          name,
          description,
          price,
          stock,
          imageUrl
        );

        for (const category of categories) {
          if (!state.productDetail.categories.includes(category))
            await addCategoryProduct(state.productDetail.id, category.id);
        }
        for (const category of state.productDetail.categories) {
          if (!categories.includes(category))
            await removeCategoryProduct(state.productDetail.id, category.id);
        }
        disabledProductCRUD();
      };
    }
    if (bandera.readOnly) {
      onSubmit = async () => {
        await disabledProductCRUD();
      };
    }
    if (bandera.create) {
      onSubmit = async (values) => {
        var { name, description, price, stock, imageUrl, categories } = values;

        imageUrl = imageUrl
          ? imageUrl.length > 0
            ? imageUrl
            : undefined
          : undefined;

        var creado = await createProduct(
          name,
          description,
          price,
          stock,
          imageUrl
        );

        if (categories.length > 0) {
          for (const category of categories) {
            await addCategoryProduct(creado.id, category.id);
          }
        }
        disabledProductCRUD();
      };
    }
  }
  function handleFilter(e){
    e.preventDefault()
    setOrder(!order)
    setFilter(e.target.name); 
    if(filter == "name" || filter == "description"){
      products = order ? products.sort((a,b)=>a[filter].toUpperCase() > b[filter].toUpperCase()? 1:-1): products.sort((a,b)=>a[filter].toUpperCase() < b[filter].toUpperCase()? 1:-1);
    }else{
      products = order ? products.sort((a,b)=>a[filter] > b[filter]? 1:-1): products.sort((a,b)=>a[filter] < b[filter]? 1:-1);
    }
  }

  return (
    <section>
      <table className={style.table}>
        <thead>
          <tr>
            <th><button className={filter == "name" ? order? style.asc: style.desc:null } name ="name"onClick={handleFilter}>Nombre:</button></th>
            <th><button className={filter == "description" ? order? style.asc: style.desc:null } name ="description"onClick={handleFilter}>Descripción:</button></th>
            <th><button className={filter == "price" ? order? style.asc: style.desc:null} name ="price"onClick={handleFilter}>Precio:</button></th>
            <th><button className={filter == "stock" ? order? style.asc: style.desc:null} name ="stock"onClick={handleFilter}>Stock:</button></th>
            <th style={{ width: "11rem" }}>
              <button onClick={() => handleCreate()}>
                <i className="fas fa-plus"></i> Agregar
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {products !== undefined && products.map((product, key) => (
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
                  <button
                    onClick={() => handleDelete(product.id, product.name)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {(bandera.readOnly || bandera.update || bandera.create) && (
        <CRUD
          formikData={state.productDetail}
          onClose={() => disabledProductCRUD()}
          onSubmit={onSubmit}
          estado={bandera}
        />
      )}
    </section>
  );
};

function mapStateToProps(state) {
  return {
    state: state.ProductsReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionsProducts, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Products);
