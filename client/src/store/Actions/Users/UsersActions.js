import {
    create,
    // remove,
    // getById,
    // getAll,
    // update,
    // getReviews,
    // ordersByUser,
    // toAdmin,
    // toGuest
} from "services/user";
import { signin } from "services/auth";

export function createUser(name, email, password, role) {
    return function (dispatch) {
        return create(name, email, password, role).then(function (data) {
            dispatch({ type: "CREATE_USER", payload: data });
        });
    };
}
export function getUser(email, password) {
    return function (dispatch) {
        return signin(email, password).then(function (data) {
            dispatch({ type: "SIGN_IN_USER", payload: data });
        });
    };
}
