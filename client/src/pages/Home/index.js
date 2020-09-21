import React from "react";
import { connect } from "react-redux";
import style from "./index.module.scss";
import { useHistory } from "react-router";
import logo from "logo.svg";

const Home = (props) => {
    const history = useHistory();

    return (
        <div className={style.home}>
            <div className={style.content}>
                <img className={style.logo} src={logo} alt="Logo" />
                <span className={style.title}>GardenRy</span>
                <span>vivero</span>
                <button
                    className={style.button}
                    onClick={() => history.push("/products")}
                >
                    ver nuestro catalogo
                </button>
            </div>
            <img
                className={style.imgBackground}
                src="https://images.unsplash.com/photo-1491147334573-44cbb4602074?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
                alt=""
            />
        </div>
    );
};

function mapStateToProps(state) {
    return {
        products: state.ProductsReducer.productCards,
        search: state.ProductsReducer.productSearch,
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
