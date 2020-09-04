import React, { useEffect } from "react";
import useQuery from "hooks/useQuery";
import search from "services/products/search";

const Products = () => {
  const query = useQuery();
  useEffect(() => {
    if (query.name) {
      (async () => {
        const result = await search(query.name);
        console.log(result);
      })();
    }
  }, [query]);
  return (
    <div>
      {query.name || ""}
      {query.category || ""}
    </div>
  );
};

export default Products;
