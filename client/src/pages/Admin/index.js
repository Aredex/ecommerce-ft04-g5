import React from "react";
import { Route } from "react-router";
import style from "./index.module.scss";
import Products from "./Products";
import Categories from "./Categories";
import { NavLink } from "react-router-dom";
import Users from "./Users";

const Admin = () => {
  return (
    <section className={style.page}>
      <aside>
        <NavLink to="/admin/products">Productos</NavLink>
        <NavLink to="/admin/categories">Categorías</NavLink>
        <NavLink to="/admin/users">Usuarios</NavLink>
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
        <Route path="/admin/users">
          <Users />
        </Route>
      </section>
    </section>
  );
};

export default Admin;
