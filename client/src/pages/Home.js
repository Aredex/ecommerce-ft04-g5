import React from "react";
import Catalogue from "components/Catalogue.js"

//Array de ejemplo con productos
var ArrayEj = [{
  img: "https://laslandas.com/wp-content/uploads/2019/11/abbaye-cluny1.jpg",
  title: "Planta 1",
  price: 450,
  id: 1
}, {
  img: "https://laslandas.com/wp-content/uploads/2019/11/abbaye-cluny1.jpg",
  title: "Planta 2",
  price: 150,
  id: 2
}, {
  img: "https://laslandas.com/wp-content/uploads/2019/11/abbaye-cluny1.jpg",
  title: "Planta 3",
  price: 12450,
  id: 3
}]

//objeto de prueba para dar estilos al contenedor del Catalogo
var estiloPrueba = { display: "flex", flexWrap: "wrap", justifyContent: "center" }

//revisar datos de prueba al conectar con la Api
const Home = () => {
  return <div className="DivContainer" style={estiloPrueba}>
    <Catalogue products={ArrayEj} />
  </div>;
};

export default Home;
