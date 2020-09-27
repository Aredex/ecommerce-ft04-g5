import Axios from "axios";
import Card from "components/Card";
import InputField from "components/InputField";
import ItemCard from "components/ItemCard";
import TextareaField from "components/TextareaField";
import { Formik } from "formik";
import useOrders from "hooks/useOrders";
import useUser from "hooks/useUser";
import React, { useReducer } from "react";
import { useHistory } from "react-router";
import style from "./index.module.scss";
import checkoutDraw from "assets/checkout.svg";
import emptyDraw from "assets/shoppingCartEmpty.svg";

function Checkout() {
    const {
        shoppingCart,
        removeProduct,
        increseAmount,
        decreaseAmount,
    } = useOrders();
    const { userLogin, updateUserData } = useUser();
    const [state, stateDispatch] = useReducer(
        (state, action) => {
            switch (action.type) {
                case "TOGGLE_NAME":
                    return { ...state, nameReadOnly: !state.nameReadOnly };
                case "TOGGLE_EMAIL":
                    return { ...state, emailReadOnly: !state.emailReadOnly };
                case "TOGGLE_ADDRESS":
                    return {
                        ...state,
                        addressReadOnly: !state.addressReadOnly,
                    };
                default:
                    return state;
            }
        },
        { nameReadOnly: true, emailReadOnly: true, addressReadOnly: true }
    );
    // const [errors, setErrors] = useState({})
    const { push } = useHistory();

    // // Si no hay nada en el carrito envía al clienta a Home
    // useEffect(() => {
    //   if (!shoppingCart) replace('/')
    // }, [shoppingCart])

    /**
     * Procesa la orden y redirecciona a mercadopago para realizar el pago de la misma
     * @param id Id de la orden a procesar
     */
    const toPayment = async (id) => {
        const { data } = await Axios.post(
            `${process.env.REACT_APP_API}/orders/${id}/toPayment`,
            {
                address: userLogin.user.address,
            }
        );
        window.location = data.redirect;
    };

    function validateName(value) {
        let error;
        if (!value) {
            error = "Necesitamos su nombre completo para poder continuar.";
        }
        return error;
    }
    function validateEmail(value) {
        let error;
        if (!value) {
            error = "Es imprescindible contar con un email válido.";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            error = "El email ingresado no es válido";
        }
        return error;
    }
    function validateAddress(value) {
        let error;
        if (!value) {
            error = "Debe especificar una dirección válida.";
        }
        return error;
    }
    function validateAllData() {
        let errors;
        const nameError = validateName(userLogin.user.name);
        const emailError = validateName(userLogin.user.email);
        const addressError = validateName(userLogin.user.address);
        nameError &&
            (errors
                ? (errors.name = nameError)
                : (errors = { name: nameError }));
        emailError &&
            (errors
                ? (errors.email = emailError)
                : (errors = { email: emailError }));
        addressError &&
            (errors
                ? (errors.address = addressError)
                : (errors = { address: addressError }));
        return errors;
    }

   


    if (userLogin && shoppingCart) {
        return (
            <div className={style.page}>
                <img src={checkoutDraw} alt="" className={style.checkoutDraw} />
                <section className={style.products}>
                    <h2>Productos</h2>
                    {shoppingCart.products.map((product) => (
                        <ItemCard
                            key={product.id}
                            product={product}
                            removeProduct={removeProduct}
                            increseAmount={increseAmount}
                            decreaseAmount={decreaseAmount}
                            showPrice
                            showQuantity
                            showAmount
                        />
                    ))}
                    <div className={style.totalOrder}>
                        <span>Total:</span>
                        <span className={style.money}>
                            ${" "}
                            {Number(shoppingCart.total).toLocaleString("es", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </span>
                    </div>
                </section>
                <section className={style.orderData}>
                    <h2>Datos de la orden</h2>
                    <Formik
                        initialValues={userLogin.user}
                        onSubmit={({ name }) => {
                            stateDispatch({ type: "TOGGLE_NAME" });
                            updateUserData({ id: userLogin.user.id, name });
                        }}
                    >
                        {({ errors, handleSubmit }) => (
                            <Card className={errors.name ? style.error : ""}>
                                <Card.Header>Nombre completo</Card.Header>
                                <Card.Body>
                                    <span>
                                        Debe confirmar que tanto su nombre como
                                        apellidos están correctos antes de
                                        proceder al pago de la orden.
                                    </span>
                                    <InputField
                                        readOnly={state.nameReadOnly}
                                        prefix="Nombre completo"
                                        prefixStyle={{
                                            background: "#f3f3f3",
                                            width: "10rem",
                                        }}
                                        inputStyle={{
                                            textTransform: "capitalize",
                                        }}
                                        name="name"
                                        style={{
                                            margin: "0.5rem 0rem",
                                            maxWidth: "20rem",
                                        }}
                                        validate={validateName}
                                    />
                                    {errors.name && (
                                        <div className={style.error}>
                                            {errors.name}
                                        </div>
                                    )}
                                </Card.Body>
                                <Card.Footer>
                                    {state.nameReadOnly ? (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                stateDispatch({
                                                    type: "TOGGLE_NAME",
                                                })
                                            }
                                        >
                                            Editar
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            className={style.primary}
                                            onClick={handleSubmit}
                                        >
                                            Actualizar
                                        </button>
                                    )}
                                </Card.Footer>
                            </Card>
                        )}
                    </Formik>
                    <Formik
                        initialValues={userLogin.user}
                        onSubmit={({ email }) => {
                            stateDispatch({ type: "TOGGLE_EMAIL" });
                            updateUserData({ id: userLogin.user.id, email });
                        }}
                    >
                        {({ errors, handleSubmit }) => (
                            <Card className={errors.email ? style.error : ""}>
                                <Card.Header>Email</Card.Header>
                                <Card.Body>
                                    <span>
                                        Es imprescindible contar con un email
                                        válido para ponernos en contacto con
                                        usetd.
                                    </span>
                                    <InputField
                                        readOnly={state.emailReadOnly}
                                        prefix="Email"
                                        prefixStyle={{
                                            background: "#f3f3f3",
                                            width: "10rem",
                                        }}
                                        name="email"
                                        style={{
                                            margin: "0.5rem 0rem",
                                            maxWidth: "20rem",
                                        }}
                                        validate={validateEmail}
                                    />
                                    {errors.email && (
                                        <div className={style.error}>
                                            {errors.email}
                                        </div>
                                    )}
                                </Card.Body>
                                <Card.Footer>
                                    {state.emailReadOnly ? (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                stateDispatch({
                                                    type: "TOGGLE_EMAIL",
                                                })
                                            }
                                        >
                                            Editar
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            className={style.primary}
                                            onClick={handleSubmit}
                                        >
                                            Actualizar
                                        </button>
                                    )}
                                </Card.Footer>
                            </Card>
                        )}
                    </Formik>
                    <Formik
                        initialValues={userLogin.user}
                        onSubmit={({ address }) => {
                            stateDispatch({ type: "TOGGLE_ADDRESS" });
                            updateUserData({ id: userLogin.user.id, address });
                        }}
                    >
                        {({ errors, handleSubmit }) => (
                            <Card className={errors.address ? style.error : ""}>
                                <Card.Header>Dirección de envío</Card.Header>
                                <Card.Body>
                                    <span>
                                        Debe especificarse una dirección lo más
                                        completa posible, para realizar la
                                        entrega correctamente.
                                    </span>
                                    <TextareaField
                                        readOnly={state.addressReadOnly}
                                        prefix="Dirección"
                                        name="address"
                                        style={{ margin: "0.5rem 0rem" }}
                                        validate={validateAddress}
                                    />
                                    {errors.address && (
                                        <div className={style.error}>
                                            {errors.address}
                                        </div>
                                    )}
                                </Card.Body>
                                <Card.Footer>
                                    {state.addressReadOnly ? (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                stateDispatch({
                                                    type: "TOGGLE_ADDRESS",
                                                })
                                            }
                                        >
                                            Editar
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            className={style.primary}
                                            onClick={handleSubmit}
                                        >
                                            Actualizar
                                        </button>
                                    )}
                                </Card.Footer>
                            </Card>
                        )}
                    </Formik>
                    <button
                        className={style.toPayment}
                        onClick={() =>
                            validateAllData()
                                ? alert(
                                      "Debe completar todos los campos correctamente."
                                  )
                                : toPayment(shoppingCart.id)
                        }
                    >
                        Proceder al pago
                    </button>
                </section>
            </div>
        );
    }

    return (
        <div className={style.page}>
            <img src={emptyDraw} alt="" className={style.emptyDraw} />
            <button
                className={style.buttonToProducts}
                onClick={() => push("/products")}
            >
                ver nuestro catalogo
            </button>
        </div>
    );
}

export default Checkout;
