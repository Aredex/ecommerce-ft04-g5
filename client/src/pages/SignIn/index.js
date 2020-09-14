import React from "react";
import { useFormik } from "formik";
import { Link, useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import style from "./Sign.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "store/Actions/Users/UsersActions"

import logo from "logo.svg";

export default function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch();


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(getUser(values.email, values.password))
        .then(() => {
          history.push(`/`)
        })
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
              <button>
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
