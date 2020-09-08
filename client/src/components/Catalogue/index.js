import React from "react";
import { useHistory } from "react-router-dom";
import ProductCard from "components/ProductCard";
import style from "./index.module.scss";

const Catalogue = ({ products }) => {
  //Modificar to de NavLink por {`/product/${props.id}`}
  const history = useHistory();
  //eliminar el Style una vez definido los estilos en css externo
  return (
    <div className={style.catalogue}>
      {products &&
        products.map(function (e) {
          const imageURL = e.images ? e.images[0]?.url || undefined : undefined;
          return (
            <ProductCard
              key={e.id}
              id={e.id}
              img={imageURL}
              title={e.name}
              price={e.price}
              onClick={() => history.push(`/products/${e.id}`)}
            />
          );
        })}
    </div>
  );
};

export default Catalogue;
