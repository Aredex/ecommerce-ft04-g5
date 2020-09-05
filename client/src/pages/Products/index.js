import React, { useEffect, useState } from "react";
import useQuery from "hooks/useQuery";
import search from "services/products/search";
import Catalogue from "components/Catalogue";
import getAll from "services/products/getAll";

const Products = () => {
  const query = useQuery();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    console.log(query.name);
    if (query.name) {
      (async () => {
        const result = await search(query.name);
        setProducts(result);
      })();
    } else {
      (async () => {
        const result = await getAll(query.name);
        setProducts(result);
      })();
    }
  }, [query.name]);
  return <Catalogue products={products} />;
};

export default Products;
