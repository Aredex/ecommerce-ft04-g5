import React, { Component } from "react";
import { connect } from "react-redux";
import { searchProduct } from "../../store/Actions/Actions.js";
import style from "./index.module.scss";

const SearchBar = (props) => {
  const inputa = React.useRef(null);

  return (
    <div className={style.inputNumber}>
      <input className="Inp" type="text" ref={inputa} placeholder="Búscalo!" />
      <button
        className={style.submit}
        onClick={() => props.searchProduct(inputa.current.value)}
      >
        <i className="fas fa-search"></i>
      </button>
    </div>
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
