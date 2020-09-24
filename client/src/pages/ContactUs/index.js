import React from 'react';
import styles from './index.module.scss';

const ContactUs = () => {
    return (
        <div className = {styles.content}>
            <div className = {styles.wrapper}>
            <h1 className = {styles.contact}>Contactenos</h1>
                <div className = {styles.form}>
                    <form>
                        <p>
                            <label>Nombre</label>
                            <input
                                type = "text"
                                name = "nombre"
                            ></input>
                        </p>
                        <p>
                            <label>Email</label>
                            <input
                                type = "email"
                                name = "email"
                            ></input>
                        </p>
                        <p>
                            <label>Teléfono</label>
                            <input
                                type = "tel"
                                name = "phone"
                            ></input>
                        </p>
                        <p>
                            <label>Asunto</label>
                            <input
                                type = "text"
                                name = "asunto"
                            ></input>
                        </p>
                        <p className = {styles.block}>
                            <label>Mensaje</label>
                            <textarea
                                name = "mensaje"
                                row = "4"
                                placeholder = "Deje acá su mensaje..."
                            ></textarea>
                        </p>
                        <p className = {styles.block}>
                            <button 
                                type = "submit"
                            >
                                <span>Enviar</span>
                            </button>
                        </p>
                    </form>
                </div>
                <div className = {styles.info}>
                    <h4>Más Info</h4>
                    <ul>
                        <li></li>
                        <li><i class="fas fa-phone"></i> 15-0000-1111</li>
                        <li><i class="fas fa-envelope-open-text"></i> contact@gardenry.com</li>
                    </ul>
                </div>
            </div>
            </div>
    )
};

export default ContactUs;