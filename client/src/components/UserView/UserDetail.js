import React from "react";
import style from "./index.module.scss";

const UserDetail = ({ name, logOut, data }) => {
    return (
        <div className={style.userform}>
            <span>
                <i className="fa fa-user"></i>
                Hola {name}!
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
