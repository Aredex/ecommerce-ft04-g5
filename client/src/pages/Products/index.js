import React, { useEffect, useState } from "react";
import useQuery from "hooks/useQuery";
import search from "services/products/search";
import Catalogue from "components/Catalogue";
import getAll from "services/products/getAll";
import {
  getAll as getAllCategories,
  getProductsFromCategory,
} from "services/categories";
import { useHistory } from "react-router";

import style from "./index.module.scss";

const Products = () => {
  const history = useHistory();
  const query = useQuery();
  const [products, setProducts] = useState([]);
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
      (async () => {
        const result = await search(query.name);
        setProducts(result);
      })();
    } else if (query.category) {
      (async () => {
        const result = await getProductsFromCategory(query.category);
        setProducts(result);
      })();
    } else {
      (async () => {
        const result = await getAll(query.name);
        setProducts(result);
      })();
    }
  }, [query.name, query.category]);
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

export default Products;
