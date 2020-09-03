import React from "react";
import PropTypes from "prop-types";
import style from "./index.module.scss";
import Header from "./Header";

const Layout = (props) => {
  return <section className={style.layout}>{props.children}</section>;
};

Layout.propTypes = {
  children: PropTypes.node,
};

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
