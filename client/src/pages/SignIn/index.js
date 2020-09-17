import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";

import logo from "logo.svg";
import style from "./Sign.module.scss";
import useUser from "hooks/useUser";
import useQuery from "hooks/useQuery";
import Axios from "axios";

export default function SignIn() {
    const { loginWithEmail } = useUser();

    const history = useHistory();
    const dispatch = useDispatch();
    const query = useQuery();
  
  useEffect(() => {
    (async () => {
      console.log("query");
      if (query.token) {
        query.token = query.token.split("#")[0];
        const { data } = await Axios.get("http://localhost:3001/auth/me", {
          headers: { Authorization: `Bearer ${query.token}` },
        });
        console.log(data);
      }
    })();
  }, [query.token]);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: (values) => {
            loginWithEmail(values.email, values.password);
            history.push("/products");
        },
    });
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
                  (window.location = "http://localhost:3001/auth/login/google")
                }
              >
                <i className="fab fa-google"></i>
              </button>
              <button
                onClick={() =>
                  (window.location =
                    "http://localhost:3001/auth/login/facebook")
                }
              >
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
