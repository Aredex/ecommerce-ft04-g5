import React, { useState, useEffect } from "react";
import SearchBar from "components/SearchBar";
import style from "./index.module.scss";
import logo from "logo.svg";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import UserInit from "components/UserInit/index"
const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    setShowNav(false);
  }, [location]);
  return (
    <header className={style.header}>
      <div className={style.nav}>
        <button
          className={style.buttonMenu}
          onClick={() => setShowNav(!showNav)}
        >
          <i className="fas fa-bars"></i>
        </button>
        <nav className={showNav ? style.showNav : ""}>
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
            <NavLink
              className={style.navLink}
              activeClassName={style.activeNav}
              to="/admin"
            >
              Administración
            </NavLink>
          </section>
          <section className={style.navLink}>
            <UserInit />
          </section>
        </nav>
      </div>
      <div className={style.headerBrand} onClick={() => history.push("/")}>
        <img className={style.logo} src={logo} alt="Logo" />
        <span className={style.brand}>GardenRy</span>
      </div>
      <SearchBar />
    </header>
  );
};

export default Header;
