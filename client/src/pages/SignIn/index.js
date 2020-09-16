import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { useLocalStorage } from "react-use";
import { getUser } from "store/Actions/Users/UsersActions";

import logo from "logo.svg";
import style from "./Sign.module.scss";

export default function SignIn() {
    const dataSignin = useSelector((x) => x.UsersReducer.userLogin);
    // const [user, setUser, removeUser] = useLocalStorage("user");

    const history = useHistory();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: (values) => {
            dispatch(getUser(values.email, values.password)).then(() => {
                history.push(`/`);
            });
        },
    });

    useEffect(() => {
        return () => {
            console.log(dataSignin);
        };
    }, [dataSignin]);

    return (
        <>
            <main className={style.main}>
                <section className={style.formSection}>
                    <img className={style.logo} src={logo} alt="" />

                    <form onSubmit={formik.handleSubmit}>
                        <span className={style.title}>Iniciar sesión</span>
                        <input
                            name="email"
                            type="email"
                            placeholder="email"
                            onChange={formik.handleChange}
                        />
                        <input
                            name="password"
                            type="password"
                            placeholder="contraseña"
                            onChange={formik.handleChange}
                        />
                        <input
                            type="submit"
                            className={style.buttonSubmit}
                            value="Iniciar"
                        />
                    </form>
                    <div className={style.otherMethods}>
                        <div className={style.separator}>
                            También puedes iniciar sesión con
                        </div>
                        <div className={style.buttonGroup}>
                            <button
                                onClick={() =>
                                    (window.location =
                                        "http://localhost:3001/auth/login/google")
                                }
                            >
                                <i className="fab fa-google"></i>
                            </button>
                            <button>
                                <i className="fab fa-facebook"></i>
                            </button>
                        </div>
                        <div className={style.buttonGroup}>
                            <span
                                className={style.a}
                                onClick={() => history.push("/sign-up")}
                            >
                                No tengo cuenta
                            </span>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
