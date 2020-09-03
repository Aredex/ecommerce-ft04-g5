import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import style from "./Sign.module.scss";

import logo from "logo.svg";

export default function SignIn() {
  const formik = useFormik({
    initialValues: {
      email: "",
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
            <span className={style.title}>Iniciar sesión</span>
            <input type="email" placeholder="email" />
            <input
              type="password"
              placeholder="contraseña"
              autocomplete="current-password"
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
              <Link
                to="/sign-up"
                component={() => (
                  <span className={style.a}>No tengo cuenta</span>
                )}
              ></Link>
            </div>
          </div>
        </section>
        <section className={style.infoSection}>
          <motion.div
            initial="pageInitial"
            animate="pageAnimate"
            variants={{
              pageInitial: {
                opacity: 0,
                transform: "translate(50px)",
              },
              pageAnimate: {
                opacity: 1,
                transform: "translate(0px)",
                transition: {
                  delay: 0.2,
                },
              },
            }}
          >
            <img className={style.logo} src={logo} alt="" />
          </motion.div>
          <motion.div
            initial="pageInitial"
            animate="pageAnimate"
            variants={{
              pageInitial: {
                opacity: 0,
                transform: "translate(50px)",
              },
              pageAnimate: {
                opacity: 1,
                transform: "translate(0px)",
                transition: {
                  delay: 0.3,
                },
              },
            }}
          >
            <span className="title">Nombre del vivero jejeje</span>
          </motion.div>
          <motion.div
            initial="pageInitial"
            animate="pageAnimate"
            variants={{
              pageInitial: {
                opacity: 0,
                transform: "translate(50px)",
              },
              pageAnimate: {
                opacity: 1,
                transform: "translate(0px)",
                transition: {
                  delay: 0.35,
                },
              },
            }}
          >
            <span className={style.subtitle}>eco vivero</span>
          </motion.div>
          <img
            className={style.backgroundImg}
            src="https://images.photowall.com/products/60831/summer-park.jpg?h=699&q=85"
            alt=""
          />
        </section>{" "}
      </main>
    </>
  );
}
