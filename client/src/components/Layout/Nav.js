import React, { useState, useEffect } from "react";
import style from "./Nav.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import UserView from "components/UserView";
import useUser from "hooks/useUser";
import logo from "logo.svg";
import { useHistory } from "react-router";

function Nav() {
  const [showNav, setShowNav] = useState(false);
  const { isAdmin } = useUser();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    setShowNav(false);
  }, [location]);

  return (
    <div className={style.nav}>
      <button className={style.buttonMenu} onClick={() => setShowNav(!showNav)}>
        <i className="fas fa-bars"></i>
      </button>
      <nav className={showNav ? style.showNav : ""}>
        <header>
          <button
            className={style.buttonMenu}
            onClick={() => setShowNav(!showNav)}
          >
            <i className="fas fa-times"></i>
          </button>
          <div className={style.headerBrand} onClick={() => history.push("/")}>
            <img className={style.logo} src={logo} alt="Logo" />
            <span className={style.brand}>GardenRy</span>
          </div>
        </header>
        <section>
          <NavLink
            exact
            className={style.navLink}
            activeClassName={style.activeNav}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={style.navLink}
            activeClassName={style.activeNav}
            to="/products"
          >
            Productos
          </NavLink>
          <NavLink
            className={style.navLink}
            activeClassName={style.activeNav}
            to="/about"
          >
            Sobre nosotros
          </NavLink>
          {isAdmin && (
            <NavLink
              className={style.navLink}
              activeClassName={style.activeNav}
              to="/admin"
            >
              Administración
            </NavLink>
          )}
        </section>
        <section className={style.navLink}>
          <UserView />
        </section>
      </nav>
    </div>
  );
}

export default Nav;
