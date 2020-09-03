import React from "react";
import { connect } from "react-redux";
import { searchProduct } from "../../store/Actions/Actions.js";
import style from "./index.module.scss";
//     <input className="Inp" type="text" ref={inputa} placeholder="Búscalo!" />
//    <button className={style.submit} onClick={() => props.searchProduct(inputa.current.value)}> BUSCAR </button>


const SearchBar = (props) => {
  const inputa = React.useRef(null);


  return (
    <form action="search" className={style.inputNumber}>
      <input name="name" className="Inp" type="text" ref={inputa} placeholder="Búscalo!" />
      <input className={style.submit} type="submit" value="Buscar"></input>
    </form>

  )

}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    searchProduct: filter => dispatch(searchProduct(filter))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);