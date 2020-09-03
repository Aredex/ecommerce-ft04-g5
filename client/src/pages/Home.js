import React from "react";
import Catalogue from "components/Catalogue.js"
import { connect } from "react-redux";

//objeto de prueba para dar estilos al contenedor del Catalogo
var estiloPrueba = { display: "flex", flexWrap: "wrap", justifyContent: "center" }

//revisar datos de prueba al conectar con la Api
const Home = (props) => {
  return <div className="DivContainer" style={estiloPrueba}>
    <Catalogue products={props.products} />
  </div>;
};


function mapStateToProps(state) {
  return {
    products: state.productCards
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
