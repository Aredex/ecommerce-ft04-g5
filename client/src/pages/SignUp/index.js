import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import style from "./Sign.module.scss";
import useUser from "hooks/useUser";

import logo from "logo.svg";

export default function SignUp() {

  const { localUser, register } = useUser()
  const history = useHistory()

  useEffect(() => {
    if (localUser) history.push('/')
  }, [localUser, history])

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    onSubmit: async (values) => {
      if (values.password === values.passwordConfirm) {
        try {
          await register(`${values.name} ${values.surname}`, values.email, values.password)
          history.push("/");
        } catch (error) {
          const data = error.response.data
          if (data.message) alert(data.message)
        }
      } else {
        alert('La contraseña no coincide.')
      }
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
              autoComplete="on"
              onChange={formik.handleChange}
            />
            <input
              name="passwordConfirm"
              type="password"
              placeholder="repetir contraseña"
              autoComplete="off"
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
                  (window.location = `${process.env.REACT_APP_API}/auth/login/google`)
                }
              >
                <i className="fab fa-google"></i>
              </button>
              <button
                onClick={() =>
                  (window.location =
                    `${process.env.REACT_APP_API}/auth/login/facebook`)
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
