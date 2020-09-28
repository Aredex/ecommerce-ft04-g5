import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import logo from "logo.svg";
import style from "./Sign.module.scss";
import useUser from "hooks/useUser";
import useQuery from "hooks/useQuery";

import resetPassword from "services/user/resetPassword"
import Axios from "axios";


export default function Reset() {

  const { localUser } = useUser()
  const history = useHistory()

  const [error, setError] = useState({})

  useEffect(() => {
    if (localUser) history.push('/')
  }, [localUser, history])

  const query = useQuery();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      await resetPassword(values.password, query.token);
      history.push("/sign-in");
    }
  });
  const formikReset = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async ({ email }) => {
      await Axios.post(`${process.env.REACT_APP_API}/users/reset/password`, { email });
      history.push("/");
    }
  });

  useEffect(() => {
    let error = {}
    if (!formik.values.password) {
      error.password = 'Escriba una contraseña';
    } else if (!/(?=.*[0-9])/.test(formik.values.password)) {
      error.password = 'La contraseña es invalida, debe tener al menos un numero';
    }
    if (formik.values.password !== formik.values.passwordC) {
      error.passwordC = 'Las contraseñas no coinciden'
    }
    setError(error)
  }, [formik.values])


  return (
    <>
      <main className={style.main}>
        <section className={style.formSection}>
          <img className={style.logo} src={logo} alt="" />
          {
            query.token ?
              <form onSubmit={formik.handleSubmit}>
                <span className={style.title}>Cambiar contraseña</span>
                <input
                  name="password"
                  type="password"
                  placeholder="Nueva contraseña"
                  onChange={formik.handleChange}
                />
                {error.password && (<p>{error.password}</p>)}
                <input
                  name="passwordC"
                  type="password"
                  placeholder="Repite contraseña"
                  autoComplete="on"
                  onChange={formik.handleChange}
                />
                {error.passwordC && (<p>{error.passwordC}</p>)}
                <input
                  type="submit"
                  className={!error.password && !error.passwordC ? style.buttonSubmit : style.buttonSubmitDisabled}
                  value="Cambiar"
                />
              </form>
              : <form onSubmit={formikReset.handleSubmit}>
                <span className={style.title}>Cambiar contraseña</span>
                <input
                  name="email"
                  type="email"
                  placeholder="email"
                  onChange={formikReset.handleChange}
                />
                <input
                  type="submit"
                  className={style.buttonSubmit}
                  value="Enviar"
                />
              </form>}
          <div className={style.otherMethods}>
            <div className={style.separator}>
              También puedes iniciar sesión con
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
          </div>
        </section>
      </main>
    </>
  );
}
