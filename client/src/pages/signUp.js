import React from "react";
import { useFormik } from "formik";
import { Link, useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import style from "./Sign.module.scss";

import logo from "logo.svg";

export default function SignIn() {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
              name="text"
              type="name"
              placeholder="nombre"
              onChange={formik.handleChange}
            />
            <input
              name="text"
              type="surname"
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
