import React from "react";

const ProductCard = ({ img, title, price }) => {

  //estilos de prueba
  const prueba = {
    margin: "5px",
    padding: "20px",
    width: "100px",
    height: "300px",
    borderRadius: "5px",
    border: "3px solid lightgreen"
  }
  return (
    //eliminar el Style una vez definido los estilos en css externo
    <div className="DivProduct" style={prueba}>
      <img src={img} style={
        {
          width: "100%",
          maxHeight: "100px",
          borderRadius: "10%"

        }} />
      <h1>{title}</h1>
      <p>${price}</p>
    </div>
  );
};

export default ProductCard;