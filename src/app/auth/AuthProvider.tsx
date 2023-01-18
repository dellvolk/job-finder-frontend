import React, {createContext, FC, PropsWithChildren, useContext, useMemo, useState} from "react";

import {initializeApp, FirebaseApp} from "firebase/app";
import {getAuth, User} from "firebase/auth";
import useAppDispatch from "../hooks/useAppDispatch";
import {authActions} from "../../store/auth/auth.slice";
import { useLazyUserInfoQuery } from "../../store/user/user.api";
import useAppSelector from "../hooks/useAppSelector";
import {selectUser} from "../../store/user/user.slice";

interface AuthProviderContextProps {
    app: FirebaseApp;
    currentUser: User | null;
    isLoggedIn: boolean;
    isRegistered: boolean
    setIsRegistered: () => void
}

export const AuthProviderContext = createContext<AuthProviderContextProps>(null);

interface AuthProviderProps extends PropsWithChildren {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
}

const AuthProvider: FC<AuthProviderProps> = ({
                                                        apiKey,
                                                        authDomain,
                                                        projectId,
                                                        storageBucket,
                                                        messagingSenderId,
                                                        appId,
                                                        measurementId,
                                                        children
                                                    }) => {
    const app = useMemo(
        () =>
            initializeApp({
                apiKey,
                authDomain,
                projectId,
                storageBucket,
                measurementId,
                messagingSenderId,
                appId
            }),
        [apiKey, appId, authDomain, measurementId, messagingSenderId, projectId, storageBucket]
    );
    const dispatch = useAppDispatch()

    const [currentUser, setCurrentUser] = useState<User>(null);
    const [isRegistered, setIsRegistered] = React.useState<boolean>(false)
    const [isLoading, setIsLoading] = useState(true);
    const [getUserInfo, {isFetching}] = useLazyUserInfoQuery()
    const userInfo = useAppSelector(selectUser)

    const auth = getAuth(app);
    auth.onAuthStateChanged((user) => {
        setCurrentUser(user);
        setIsLoading(false);
    }, undefined, () => {

    });

    React.useEffect(() => {
        dispatch(authActions.setAuth({
            // app,
            currentUser,
            isLoggedIn: !!currentUser
        }))
        if (currentUser && !isRegistered) {
            getUserInfo()
        }
    }, [app, currentUser, isRegistered])

    if (isLoading
        // || (!!currentUser && !userInfo)
    ) {
        return <>Loading...</>;
    }

    return (
        <AuthProviderContext.Provider value={{app, currentUser, isLoggedIn: !!currentUser, isRegistered, setIsRegistered: () => setIsRegistered(true)}}>
            {children}
        </AuthProviderContext.Provider>
    );
};

export default AuthProvider

// export const useAuth = () => {
//     const {app, currentUser, isLoggedIn} = useContext(AuthProviderContext);
//     const auth = getAuth(app);
//
//     return {auth, currentUser, isLoggedIn};
// };

/*
import React from "react"
import { useRefreshMutation } from "../../store/auth/auth.api"

export default function AuthProvider({ children }: { children: React.ReactNode }) {
	const [refresh, { isSuccess, isError }] = useRefreshMutation()
	const [init, setInit] = React.useState(true)

	React.useEffect(() => {
		const refresh_token = localStorage.getItem("refresh")

		if (refresh_token) {
			refresh(refresh_token)
		} else {
			setInit(false)
		}
	}, [refresh])

	if (!isSuccess && !isError && init) {
		return <h1>Loading!</h1>
	}

	return <>{children}</>
}
*/
