import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import authApi from "./auth.api";
import {showSuccessMessage} from "../../app/helpers";
import {User} from "firebase/auth";

export type TAuthModalType = "login" | "registration" | false

type IFirebaseAuth = {
    // app: FirebaseApp | null,
    currentUser: User | null,
    isLoggedIn: boolean
}

const INITIAL_STATE = {
    token: null, // access token
    permissions: [],
    authModalType: false,
    auth: {
        // app: null,
        currentUser: null,
        isLoggedIn: false
    }
} as {
    token: null | string
    permissions: string[]
    authModalType: TAuthModalType
    auth: IFirebaseAuth
};

const authSlice = createSlice({
    name: "auth",
    initialState: INITIAL_STATE,
    reducers: {
        setCredentials: (state, {payload: {token}}: PayloadAction<{ token: string | null }>
        ) => {
            state.token = token;
        },
        logout: (state) => {
            localStorage.removeItem("refresh");
            return INITIAL_STATE;
        },
        setAuthModalType: (state, {payload: {type}}: PayloadAction<{ type: "login" | "registration" | false }>) => {
            state.authModalType = type;
        },
        setAuth: (state, {payload}:PayloadAction<IFirebaseAuth>) => {
            const {
                // app,
                currentUser,
                isLoggedIn
            } = payload
            console.log({currentUser,isLoggedIn})
            state.auth = { currentUser, isLoggedIn }
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, {payload}) => {
            state.token = payload.access;
            state.authModalType = false;
            localStorage.setItem("refresh", payload.refresh);
        });
        builder.addMatcher(authApi.endpoints.signup.matchFulfilled, (state, {payload}) => {
            showSuccessMessage("Registration was successful. You can Log In");
            state.authModalType = "login";
        });
        builder.addMatcher(authApi.endpoints.refresh.matchFulfilled, (state, {payload}) => {
            state.token = payload.access;
            console.log("success");
            // localStorage.setItem('refresh', payload.refresh)
        });
        builder.addMatcher(authApi.endpoints.permissions.matchFulfilled, (state, {payload}) => {
            state.permissions = payload;
        });
    }
});

export const {setCredentials, logout, setAuthModalType} = authSlice.actions;
export const authActions = authSlice.actions

export default authSlice.reducer;

export const selectToken = (state: RootState) => state.auth.token;
export const selectPermissions = (state: RootState) => state.auth.permissions;
export const selectAuthModalType = (state: RootState) => state.auth.authModalType;
export const selectAuth = (state: RootState) => state.auth;
