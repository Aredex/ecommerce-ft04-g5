import React from "react";
import { Route } from "react-router";
import style from "./index.module.scss";
import Products from "./Products";
import Categories from "./Categories";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <section className={style.page}>
      <aside>
        <Link to="/admin/products">Productos</Link>
        <Link to="/admin/categories">Categorías</Link>
      </aside>
      <section>
        <Route exact path="/admin">
          <div>Panel de administración</div>
        </Route>
        <Route path="/admin/products">
          <Products />
        </Route>
        <Route path="/admin/categories">
          <Categories />
        </Route>
      </section>
    </section>
  );
};

export default Admin;
