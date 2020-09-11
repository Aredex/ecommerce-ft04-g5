import React, { useEffect, useState } from "react";
import { getAll as getAllCategories } from "services/categories";
import { useHistory } from "react-router";
import useQuery from "hooks/useQuery";
import Catalogue from "components/Catalogue";
import { connect } from "react-redux";
import * as actionsProducts from "store/Actions/Products/ProductsActions";
import { bindActionCreators } from "redux";

import style from "./index.module.scss";

const Products = ({ searchProduct, getProducts, state, productsFromCategory }) => {
  const query = useQuery();
  const history = useHistory();
  var products;

  const [categories, setCategories] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  function isActive(key) {
    return query.category
      ? query.category.toString() === key.toString()
      : false;
  }

  useEffect(() => {
    (async () => setCategories(await getAllCategories()))();
  }, []);

  useEffect(() => {
    if (query.name) {
      searchProduct(query.name);
    }
    else {
      getProducts();
    }
  }, [query.name]);

  useEffect(() => {
    if (query.category) {
      productsFromCategory(query.category);
    }
    else {
      getProducts();
    }
  }, [query.category]);

  if (query.name) {
    products = state.productSearch
  } else if (query.category) {
    products = state.categoryFilter
  } else {
    products = state.productCards
  }

  return (
    <section className={style.page}>
      <div className={style.filter}>
        <div className={style.filterButton}>
          <span>Filtrar por categoría</span>
          <button onClick={() => setShowFilter(!showFilter)}>
            Filtrar{" "}
            <i
              className={[
                "fas",
                showFilter ? "fa-caret-up" : "fa-caret-down",
              ].join(" ")}
            ></i>
          </button>
        </div>
        <ul
          className={[style.filterBody, showFilter ? style.show : ""].join(" ")}
        >
          {categories.map((category) => (
            <li
              key={category.id}
              onClick={() => history.push(`/products?category=${category.id}`)}
              className={isActive(category.id) ? style.active : ""}
            >
              {category.name}
            </li>
          ))}
          <li
            key={"all"}
            onClick={() => history.push(`/products`)}
            className={!query.category ? style.active : ""}
          >
            Mostrar todos los articulos
          </li>
        </ul>
      </div>
      <Catalogue products={products} />
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
