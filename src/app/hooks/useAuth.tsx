import React, {useContext} from "react"
import useAppSelector from "./useAppSelector"
import {getAuth} from "firebase/auth";
import {AuthProviderContext} from "../auth/AuthProvider";

// const useAuth = () => {
// 	const {token} = useAppSelector(state => state.auth)
//
// 	return React.useMemo(() => !!token, [token])
// }

export const useAuth = () => {
    const {app, currentUser, isLoggedIn} = useContext(AuthProviderContext);
    const auth = getAuth(app);

    return {auth, currentUser, isLoggedIn};
};

export default (useAuth)
