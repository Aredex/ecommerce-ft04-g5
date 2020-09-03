import React from "react";
import { NavLink } from 'react-router-dom';
import ProductCard from 'components/ProductCard.js'


const Catalogue = ({ products }) => {
  //Modificar to de NavLink por {`/product/${props.id}`}

  var productos = products.map(function (e) {
    return (
      <NavLink to={`/product/${e.id}`}>
        <ProductCard
          id={e.id}
          img={e.img}
          title={e.title}
          price={e.price}
        ></ProductCard>
      </NavLink>
    )

  })
  //eliminar el Style una vez definido los estilos en css externo
  return (
    <div className="DivProductCard" style={{ display: "inline-flex" }}>
      {productos}
    </div>

  );
};

export default Catalogue;