import React from "react";
import style from "./index.module.scss";

function Modal(props) {
  return (
    <>
      <div className={style.beforeModal} />
      <div className={style.modal}>{props.children}</div>
    </>
  );
}

Modal.Header = (props) => <div className={style.header}>{props.children}</div>;
Modal.Body = (props) => <div className={style.body}>{props.children}</div>;
Modal.Footer = (props) => <div className={style.footer}>{props.children}</div>;

Modal.propTypes = {};

export default Modal;
