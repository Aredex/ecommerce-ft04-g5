import React from "react";
import style from "./index.module.scss";
import { useFormik } from "formik";
import { useHistory } from "react-router";

const SearchBar = () => {
  let history = useHistory();
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      history.push(`/products?name=${values.name}`);
    },
  });

  return (
    <form className={style.inputNumber} onSubmit={formik.handleSubmit}>
      <input
        className="Inp"
        type="text"
        name="name"
        placeholder="Búscalo!"
        onChange={formik.handleChange}
      />
      <button className={style.submit} type="submit">
        <i className="fas fa-search"></i>
      </button>
    </form>
  );
};


export default SearchBar
