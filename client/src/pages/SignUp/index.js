import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Link, useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import style from "./Sign.module.scss";
import { createUser } from "store/Actions/Users/UsersActions";

import { useSelector, useDispatch } from "react-redux";
import useUser from "hooks/useUser";

import logo from "logo.svg";

export default function SignUp() {

  const { localUser } = useUser()
  const history = useHistory()

  useEffect(() => {
    if (localUser) history.push('/')
  }, [localUser])

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    onSubmit: (values) => {
      dispatch(
        createUser(values.name, values.email, values.passwordConfirm, "ADMIN")
      ).then(() => {
        history.push("/sign-in");
      });
    },
  });

  return (
    <>
      <main className={style.main}>
        <section className={style.formSection}>
          <img className={style.logo} src={logo} alt="" />

          <form onSubmit={formik.handleSubmit}>
            <span className={style.title}>Registrarte</span>
            <input
              type="text"
              name="name"
              placeholder="nombre"
              onChange={formik.handleChange}
            />
            <input
              type="text"
              name="surname"
              placeholder="apellido"
              onChange={formik.handleChange}
            />
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
              name="passwordConfirm"
              type="password"
              placeholder="repetir contraseña"
              onChange={formik.handleChange}
            />
            <input
              type="submit"
              className={style.buttonSubmit}
              value="Enviar"
            />
          </form>
          <div className={style.otherMethods}>
            <div className={style.separator}>
              También puedes registrarte con
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
                <i className="fab fa-facebook"></i>
              </button>
            </div>
            <div className={style.buttonGroup}>
              <span
                className={style.a}
                onClick={() => history.push("/sign-in")}
              >
                Ya tengo cuenta
              </span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
