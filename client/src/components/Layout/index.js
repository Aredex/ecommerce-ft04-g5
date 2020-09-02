import React from "react";
import PropTypes from "prop-types";
import style from "./index.module.scss";
import logo from "logo.svg";

const Layout = (props) => {
  return <section className={style.layout}>{props.children}</section>;
};

Layout.propTypes = {
  children: PropTypes.node,
};

const Header = (props) => {
  return (
    <header className={style.header}>
      <div className={style.headerBrand}>
        <img className={style.logo} src={logo} alt="Logo" />
        <span className={style.brand}>El viveroo</span>
      </div>
      <div></div>
    </header>
  );
};

Header.propTypes = {};

const Content = (props) => {
  return <main className={style.content}>{props.children}</main>;
};

Content.propTypes = {
  children: PropTypes.node,
};

const Footer = (props) => {
  return <footer className={style.footer}></footer>;
};

Footer.propTypes = {};

Layout.Header = Header;
Layout.Content = Content;
Layout.Footer = Footer;

export default Layout;
