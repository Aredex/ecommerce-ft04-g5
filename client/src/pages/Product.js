import React from "react";
import style from "./Product.module.scss";

class Product extends React.Component {
  state = {
    count: 0,
  };

  handleClick_suma = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  handleClick_resta = () => {
    if (this.state.count <= 1) {
      return 1;
    }
    this.setState({
      count: this.state.count - 1,
    });
  };

  render() {
    const { count } = this.state;
    return (
      <div>
        <img
          src="https://laslandas.com/wp-content/uploads/2019/11/abbaye-cluny1.jpg"
          alt="FotoPlanta"
          width="200"
          height="200"
        ></img>
        <h1>Abbaye de Cluny</h1>
        <p>$450</p>
        <p>Descripcion</p>
        <p>Tipo:Híbrida de té</p>
        <button>
          <i className={["fas", "fa-shopping-cart", style.icon].join(" ")}></i>
          Añadir al Carro
        </button>
        <input placeholder={count}></input>
        <button onClick={this.handleClick_suma}>
          <i className={["fas", "fa-angle-up", style.icon].join(" ")}></i>
        </button>
        <button onClick={this.handleClick_resta}>
          <i className={["fas", "fa-angle-down", style.icon].join(" ")}></i>
        </button>
      </div>
    );
  }
}

export default Product;
