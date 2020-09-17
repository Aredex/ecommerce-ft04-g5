import React from "react";
import { useSelector } from "react-redux";
import useUser from "hooks/useUser";
import style from "./index.module.scss";
import UserDetail from "./UserDetail";

function UserView() {
    const { logOut } = useUser();
    const data = useSelector((x) => x.UsersReducer.userLogin);
    let user = null;
    if (data) user = data.user;

    return (
        <div className={style.divPrincipal}>
            <div className={style.parrafo1}>
                {data ? (
                    <div>
                        <UserDetail
                            name={user.name}
                            logOut={logOut}
                            data={data}
                        />
                    </div>
                ) : (
                    <i className="fa fa-user"></i>
                )}

                <span>
                    {!data && "Inicia sesion"}
                    {!data && (
                        <a href="/sign-in" className={style.link1}>
                            {" "}
                            Ingresá | Registrate
                        </a>
                    )}
                </span>
            </div>
        </div>
    );
}

export default UserView;
