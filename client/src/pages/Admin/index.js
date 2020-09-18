import React, { useEffect } from "react";
import { Route, useHistory } from "react-router";
import style from "./index.module.scss";
import Products from "./Products";
import Categories from "./Categories";
import { NavLink } from "react-router-dom";
import Users from "./Users";
import Orders from "./Orders";
import OrderDetail from "./Orders/OrderDetail";
import useUser from "hooks/useUser";

const Admin = () => {
  const { localUser } = useUser()
  const history = useHistory()
  useEffect(() => {
    if (!localUser) history.push('/')
    else if (!localUser.user) history.push('/')
    else if (localUser.user.role !== 'ADMIN') {
      history.replace('/')
    }
  }, [localUser])
  return (
    <section className={style.page}>
      <aside>
        <NavLink
          className={style.navLink}
          activeClassName={style.activeNav}
          to="/admin"
          exact
        >
          Dashboard
        </NavLink>
        <NavLink
          className={style.navLink}
          activeClassName={style.activeNav}
          to="/admin/products"
        >
          Productos
        </NavLink>
        <NavLink
          className={style.navLink}
          activeClassName={style.activeNav}
          to="/admin/categories"
        >
          Categorías
        </NavLink>
        <NavLink
          className={style.navLink}
          activeClassName={style.activeNav}
          to="/admin/orders"
        >
          Ordenes
        </NavLink>
        <NavLink
          className={style.navLink}
          activeClassName={style.activeNav}
          to="/admin/users"
        >
          Usuarios
        </NavLink>
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
        <Route exact path="/admin/orders">
          <Orders />
        </Route>
        <Route path="/admin/orders/:id">
          <OrderDetail />
        </Route>
        <Route path="/admin/users">
          <Users />
        </Route>
      </section>
    </section>
  );
};

export default Admin;
