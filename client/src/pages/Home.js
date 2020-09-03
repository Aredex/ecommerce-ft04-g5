import React from "react";
import Catalogue from "components/Catalogue.js"
import { connect } from "react-redux";
import { getProducts } from "../store/Actions/Actions.js"

//objeto de prueba para dar estilos al contenedor del Catalogo
var estiloPrueba = { display: "flex", flexWrap: "wrap", justifyContent: "center" }

//revisar datos de prueba al conectar con la Api
const Home = (props) => {
  console.log(props.location)

  React.useEffect(() => {
    if (props.search.length == 0) {
      props.getProducts()
    }

  })

  return <div className="DivContainer" style={estiloPrueba}>
    <Catalogue products={props.search.length > 0 ? props.search : props.products} />
  </div>;
};


function mapStateToProps(state) {
  return {
    products: state.productCards,
    search: state.productSearch
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProducts: () => dispatch(getProducts())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
