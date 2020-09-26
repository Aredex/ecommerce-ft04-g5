import React, { useState } from 'react'
import { Route } from 'react-router';
import { NavLink } from 'react-router-dom';
import General from './General';
import style from "./index.module.scss";
import Orders from './Orders';

function Profile() {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className={style.page}>
      <aside>
        <div className={style.filterButton}>
          <button onClick={() => setShowFilter(!showFilter)}>
            Menu{" "}
            <i
              className={[
                "fas",
                showFilter ? "fa-caret-up" : "fa-caret-down",
              ].join(" ")}
            ></i>
          </button>
        </div>
        <div className={[style.navList, showFilter ? style.show : ""].join(" ")}>
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
        </div>
      </aside>
      <section>
        <Route path="/profile" exact component={General} />
        <Route path="/profile/orders" exact component={Orders} />
      </section>
    </div>
  )
}

export default Profile
