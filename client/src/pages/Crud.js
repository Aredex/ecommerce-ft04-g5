import React from "react";

const Product = () => {
  return (
    <div className={"style.commentAddWrapper"}>
      {/* <div className={"style.commentAddBtn"} onClick={""}>
        <span>+</span>
      </div> */}
      <div className={"style.modalClasses"}>
        <h2>Añadi tu nueva planta!</h2>
        <form onSubmit={"this.addComment.bind(this)"}>
          <p>Titulo</p>
          <input></input>
          <p>Precio</p>
          <input></input>
          <p>Stock</p>
          <input></input>
          <br />
          <button
            type="button"
            className={"style.btnDefault"}
            onClick={"this.toggleModal.bind(this)"}
          >
            Cancelar
          </button>
          <button type="submit" className={"style.btnSuccess"}>
            Añadir
          </button>
        </form>
      </div>
    </div>
  );
};

export default Product;
