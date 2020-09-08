import React, { useEffect, useState } from "react";
import useQuery from "hooks/useQuery";
import search from "services/products/search";
import Catalogue from "components/Catalogue";
import { getProducts } from "store/Actions/Products/ProductsActions";
import { useDispatch, useSelector } from "react-redux";

const Products = () => {
  const query = useQuery();

  const dispatch = useDispatch();
  const products = useSelector((x) => x.ProductsReducer.productCards);

  useEffect(() => {
    if (query.name) {
      (async () => {
        const result = await search(query.name);
        //setProducts(result);
      })();
    } else {
      (async () => {
        dispatch(await getProducts());
      })();
    }
  }, [query.name]);
  return <Catalogue products={products} />;
};

export default Products;