import { useFormik  } from "formik";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SignUp() {
    const formik = useFormik({
        initialValues: {
          email: '',
        },
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
      });

    return (
        <>
            <main>
                <section className="info-section">
                    <motion.div initial="pageInitial" animate="pageAnimate" variants={{
                        pageInitial: {
                            opacity: 0,
                            transform: 'translate(-50px)'
                        },
                        pageAnimate: {
                            opacity: 1,
                            transform: 'translate(0px)',
                            transition: {
                                delay: .2
                            }
                        },
                    }}>
                        <img className="logo" src="/logo-alt.svg" alt="" />
                    </motion.div>
                    <motion.div initial="pageInitial" animate="pageAnimate" variants={{
                        pageInitial: {
                            opacity: 0,
                            transform: 'translate(-50px)'
                        },
                        pageAnimate: {
                            opacity: 1,
                            transform: 'translate(0px)',
                            transition: {
                                delay: .3
                            }
                        },
                    }}>
                        <span className="title">
                            Next <b>Panel</b>
                        </span>
                    </motion.div>
                    <motion.div initial="pageInitial" animate="pageAnimate" variants={{
                        pageInitial: {
                            opacity: 0,
                            transform: 'translate(-50px)'
                        },
                        pageAnimate: {
                            opacity: 1,
                            transform: 'translate(0px)',
                            transition: {
                                delay: .35
                            }
                        },
                    }}>
                        <span className="subtitle">
                            Controla todos los aspectos de tu e-commerce desde un solo lugar
                        </span>
                    </motion.div>
                    <img className="background-img" src="/sign.jpg" alt="" />
                </section>
                <section className="form-section">
                    <img className="logo" src="/logo.svg" alt="" />

                    <form>
                        <span className="title">
                            Registrarse
                        </span>
                        <input placeholder="email" />
                        <input placeholder="contraseña" />
                        <input type="submit" className="button-submit" value="Siguiente" />
                    </form>
                    <div className="separator">También puedes registrarte con</div>
                    <div className="button-group">
                        <button>
                            <i className="fab fa-google"></i>
                        </button>
                        <button>
                            <i className="fab fa-facebook"></i>
                        </button>
                    </div>
                    <div className="button-group">
                        <Link href="/signIn">
                            <a>Ya tengo cuenta</a>
                        </Link>
                    </div>
                </section>
            </main>
            <style jsx>
                {`
                @import 'styles/bp.scss';

                main {
                    display: flex;
                    flex-direction: row;
                    position: relative;
                    height: 100vh;
                    width: 100%;
                    overflow-y: auto;
                    overflow-x: hidden;
                }
                .info-section {
                    position: relative;
                    width: stretch;
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    background-color: #e63946aa;

                    @include respond-to('default') {
                        visibility: collapse;
                        width: 0;
                        padding: 0rem;                
                    }

                    @include respond-to('small') {
                        visibility: visible;
                        width: stretch;
                        padding: 2rem;                
                    }

                    .logo {
                        width: 15rem;
                        padding: 2.5rem;
                    }
                    .title {
                        font-size: 2rem;
                        color: #ffffff;
                    }
                    .subtitle {
                        font-size: 1rem;
                        color: #ffffff;
                        font-weight: 100;
                    }
                    .background-img {
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        object-fit: cover;
                        z-index: -1;
                    }
                }
                .form-section {
                    width: 100%;
                    height: 100vh;
                    padding: 2rem;                
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    background-color: #ffffff;
                    img {
                        width: 15rem;
                        padding: 2.5rem;
                        padding-bottom: 0.5rem;
                    }
                    form {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin-bottom: 5rem;
                        .title {
                            font-size: 2rem;
                            color: #e63946;
                            padding: 1rem;
                        }

                        input {
                            width: 15rem;
                            border-color: transparent;
                            border-style: solid;
                            border-width: 2px;
                            border-radius: 9999px;
                            padding: 0.5rem 1rem;
                            margin: 0.5rem;
                            color: #1d3557;
                            box-shadow: 0 0 4px #d5d5d5;
                            transition-property: background,box-shadow;
                            transition-duration: 0.25s;
                            ::placeholder {
                                color: #457b9d;
                            }
                            :focus {
                                outline: none;
                            }
                            :hover {
                                box-shadow: 0 1px 8px #c5c5c5;
                            }
                        }

                        .button-submit {
                            background: #e63946;
                            color: #ffffff;
                            cursor: pointer;
                            :hover {
                                background: #C81927;
                            }
                        }
                    }
                    .separator {
                        display: flex;
                        align-items: center;
                        text-align: center;
                        color: #333;
                        margin: 1rem 0rem;
                        font-size: 0.75rem;
                        width: 100%;
                        ::before, ::after {
                            content: '';
                            flex: 1;
                            border-bottom: 1px solid #c5c5c5;
                        }
                        ::before {
                            margin-right: 1em;
                        }
                        ::after {
                            margin-left: 1em;
                        }
                    }
                    .button-group {
                        display: flex;
                        margin: 1rem 0rem;
                        button {
                            border-radius: 9999px;
                            border: none;
                            padding: 0.75rem;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            background: #ffffff;
                            box-shadow: 0 0 6px #d5d5d5;
                            transition-property: background,box-shadow,color;
                            transition-duration: 0.25s;
                            cursor: pointer;
                            margin: 0.5rem 1rem;
                            :hover {
                                box-shadow: 0 1px 10px #c5c5c5;
                                color: #e63946;
                            }

                            .fab {
                                font-size: 1.5rem;
                            }
                        }
                        a {
                            transition-property: color;
                            transition-duration: 0.25s;
                            font-weight: 600;
                            cursor: pointer;
                            :hover {
                                color: #e63946;
                            }
                        }
                    }
                }                
                `}
            </style>
        </>
    )
}