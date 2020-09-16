import { useEffect } from "react";
import { useLocalStorage } from "react-use";
import { useDispatch } from "react-redux";
import { signin } from "services/auth";
import { getUser } from "store/Actions/Users/UsersActions";

export default function useUser() {
    const [localUser, setLocalUser, removeLocalUser] = useLocalStorage(
        "user",
        undefined
    );

    const dispatch = useDispatch();

    useEffect(() => {
        console.log('localUser',localUser)
        dispatch(getUser(localUser));
    }, [localUser, dispatch]);

    async function loginWithEmail(username, password) {
        const user = await signin(username, password);
        if (user) setLocalUser(user);
    }

    function logOut() {
        removeLocalUser();
    }

    return { localUser, loginWithEmail, logOut };
}
