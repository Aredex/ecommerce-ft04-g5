import React from 'react'
import { Route } from 'react-router';
import { NavLink } from 'react-router-dom';
import General from './General';
import style from "./index.module.scss";
import Orders from './Orders';

function Profile() {
  return (
    <div className={style.page}>
      <aside>
        <NavLink
          className={style.navLink}
          activeClassName={style.activeNav}
          to="/profile"
          exact
        >
          Datos
        </NavLink>
        <NavLink
          className={style.navLink}
          activeClassName={style.activeNav}
          to="/profile/orders"
        >
          Ordenes
        </NavLink>
      </aside>
      <section>
        <Route path="/profile" exact component={General} />
        <Route path="/profile/orders" exact component={Orders} />
      </section>
    </div>
  )
}

export default Profile
