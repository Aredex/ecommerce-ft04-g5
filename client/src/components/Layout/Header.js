import React from "react";
import SearchBar from "components/SearchBar";
import ShoppingCart from "components/ShoppingCart";
import style from "./index.module.scss";
import logo from "logo.svg";
import Nav from "./Nav";
import { useHistory } from "react-router";

const Header = () => {
  const history = useHistory();
  return (
    <header className={style.header}>
      <Nav />
      <div className={style.headerBrand} onClick={() => history.push("/")}>
        <img className={style.logo} src={logo} alt="Logo" />
        <span className={style.brand}>GardenRy</span>
      </div>
      <SearchBar />
      <ShoppingCart />
    </header>
  );
};

export default Header;
