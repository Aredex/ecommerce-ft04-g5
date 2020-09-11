import React, { useEffect } from "react";
import useQuery from "hooks/useQuery";
import Catalogue from "components/Catalogue";
import { connect } from "react-redux";
import * as actionsProducts from "store/Actions/Products/ProductsActions"
import { bindActionCreators } from 'redux'


const Products = ({ searchProduct, getProducts, state }) => {
  const query = useQuery();
  var products;
  useEffect(() => {
    if (query.name) {
      searchProduct(query.name)
    } else {
      getProducts()
    }
  }, [query.name]);
  query.name ? products = state.productSearch : products = state.productCards

  return <Catalogue products={products} />;
};

function mapStateToProps(state) {
  return {
    state: state.ProductsReducer
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionsProducts, dispatch)
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);