import React from 'react';
import {Navigate, useLocation} from "react-router-dom";
import useAppSelector from "../hooks/useAppSelector";
import {selectToken} from "../../store/auth/auth.slice";
import useAuth from "../hooks/useAuth";

function RequireAuth({children}: { children: JSX.Element }) {
    // const token = useAppSelector(selectToken);
    const { isLoggedIn } = useAuth()
    const location = useLocation();

    if (!isLoggedIn) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/" state={{from: location}} replace/>;
    }

    return children;
}

export default (RequireAuth);
