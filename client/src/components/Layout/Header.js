import React from "react";
import SearchBar from "components/SearchBar";
import style from "./index.module.scss";
import logo from "logo.svg";

const Header = () => {
  return (
    <header className={style.header}>
      <button className={style.buttonMenu}>
        <i className="fas fa-bars"></i>
      </button>
      <div className={style.headerBrand}>
        <img className={style.logo} src={logo} alt="Logo" />
        <span className={style.brand}>GardenRy</span>
      </div>
      <SearchBar />
    </header>
  );
};

export default Header;
