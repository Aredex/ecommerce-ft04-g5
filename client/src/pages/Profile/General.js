import Card from 'components/Card';
import InputField from 'components/InputField';
import TextareaField from 'components/TextareaField';
import { Formik } from 'formik';
import useUser from 'hooks/useUser';
import React, { useReducer } from 'react'
import style from "./index.module.scss";

const General = () => {
  const [state, stateDispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'TOGGLE_NAME': return { ...state, nameReadOnly: !state.nameReadOnly }
      case 'TOGGLE_EMAIL': return { ...state, emailReadOnly: !state.emailReadOnly }
      case 'TOGGLE_ADDRESS': return { ...state, addressReadOnly: !state.addressReadOnly }
      default: return state
    }
  }, { nameReadOnly: true, emailReadOnly: true, addressReadOnly: true })
  const { userLogin, updateUserData } = useUser()

  function validateName(value) {
    let error;
    if (!value) {
      error = 'Necesitamos su nombre completo para poder continuar.';
    }
    return error;
  }
  function validateEmail(value) {
    let error;
    if (!value) {
      error = 'Es imprescindible contar con un email válido.';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'El email ingresado no es válido';
    }
    return error;
  }
  function validateAddress(value) {
    let error;
    if (!value) {
      error = 'Debe especificar una dirección válida.';
    }
    return error;
  }

  return (
    <div>
      {userLogin &&
        <>
          <Formik initialValues={userLogin.user} onSubmit={({ name }) => { stateDispatch({ type: 'TOGGLE_NAME' }); updateUserData({ id: userLogin.user.id, name }) }}>
            {({ errors, handleSubmit }) => (
              <Card className={errors.name ? style.error : ''}>
                <Card.Header>
                  Nombre completo
                </Card.Header>
                <Card.Body>
                  <span>
                    Es nescesario contar con su nombre completo en todo momento, conocer a nuestros clientes es lo más importante para nosotros.
                  </span>
                  <InputField readOnly={state.nameReadOnly} prefix="Nombre completo" prefixStyle={{ background: '#f3f3f3', width: '10rem' }} inputStyle={{ textTransform: 'capitalize' }} name="name" style={{ margin: '0.5rem 0rem', maxWidth: '20rem' }} validate={validateName} />
                  {errors.name && <div className={style.error}>{errors.name}</div>}
                </Card.Body>
                <Card.Footer>
                  {
                    state.nameReadOnly
                      ? <button
                        type="button"
                        onClick={() => stateDispatch({ type: 'TOGGLE_NAME' })}
                      >
                        Editar
                    </button>
                      : <button
                        type="submit"
                        className={style.primary}
                        onClick={handleSubmit}
                      >
                        Actualizar
                  </button>
                  }
                </Card.Footer>
              </Card>
            )}
          </Formik>
          <Formik initialValues={userLogin.user} onSubmit={({ email }) => { stateDispatch({ type: 'TOGGLE_EMAIL' }); updateUserData({ id: userLogin.user.id, email }) }}>
            {({ errors, handleSubmit }) => (
              <Card className={errors.email ? style.error : ''}>
                <Card.Header>
                  Email
            </Card.Header>
                <Card.Body>
                  <span>
                    La comunicación es muy importante, y el email es una de las más importantes en estos momentos.
              </span>
                  <InputField readOnly={state.emailReadOnly} prefix="Email" prefixStyle={{ background: '#f3f3f3', width: '10rem' }} name="email" style={{ margin: '0.5rem 0rem', maxWidth: '20rem' }} validate={validateEmail} />
                  {errors.email && <div className={style.error}>{errors.email}</div>}
                </Card.Body>
                <Card.Footer>
                  {
                    state.emailReadOnly
                      ? <button
                        type="button"
                        onClick={() => stateDispatch({ type: 'TOGGLE_EMAIL' })}
                      >
                        Editar
                </button>
                      : <button
                        type="submit"
                        className={style.primary}
                        onClick={handleSubmit}
                      >
                        Actualizar
              </button>
                  }
                </Card.Footer>
              </Card>
            )}
          </Formik>
          <Formik initialValues={userLogin.user} onSubmit={({ address }) => { stateDispatch({ type: 'TOGGLE_ADDRESS' }); updateUserData({ id: userLogin.user.id, address }) }}>
            {({ errors, handleSubmit }) => (
              <Card className={errors.address ? style.error : ''}>
                <Card.Header>
                  Dirección de envío
           </Card.Header>
                <Card.Body>
                  <span>
                    Especificar su dirección lo más completa posible, nos ayuda a evitar errores y/o retrasos en las entregas.
              </span>
                  <TextareaField readOnly={state.addressReadOnly} prefix="Dirección" name="address" prefixStyle={{ background: '#f3f3f3' }} style={{ margin: '0.5rem 0rem' }} validate={validateAddress} />
                  {errors.address && <div className={style.error}>{errors.address}</div>}
                </Card.Body>
                <Card.Footer>
                  {
                    state.addressReadOnly
                      ? <button
                        type="button"
                        onClick={() => stateDispatch({ type: 'TOGGLE_ADDRESS' })}
                      >
                        Editar
                </button>
                      : <button
                        type="submit"
                        className={style.primary}
                        onClick={handleSubmit}
                      >
                        Actualizar
              </button>
                  }
                </Card.Footer>
              </Card>
            )}
          </Formik></>}
    </div>
  )
}

export default General
