import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import auth from './auth/auth.slice'
import user from './user/user.slice'
import authApi from './auth/auth.api'
import userApi from './user/user.api'
import {errorHandler} from "./middlewares";

export const store = configureStore({
    reducer: {
        auth,
		user,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware: any) => getDefaultMiddleware()
        .concat([authApi.middleware, userApi.middleware, errorHandler]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
