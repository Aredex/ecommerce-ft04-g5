import React from "react";
import { connect } from "react-redux";
import { searchProduct } from "../../store/Actions/Actions.js";
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

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    searchProduct: (filter) => dispatch(searchProduct(filter)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
