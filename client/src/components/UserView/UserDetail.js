import React from "react";
import { useHistory } from "react-router";
import style from "./index.module.scss";

const UserDetail = ({ name, logOut, data }) => {
    const { push } = useHistory()
    return (
        <div className={style.userform}>
            <span>
                <i className="fa fa-user"></i>
                <span onClick={() => push('/profile')}>Hola {name.split(' ')[0]}!</span>
                <a
                    href="/sign-in"
                    onClick={() => logOut()}
                    className={style.link1}
                >
                    {" "}
                    Cerrar sesión
                </a>
            </span>
        </div>
    );
};

export default UserDetail;
