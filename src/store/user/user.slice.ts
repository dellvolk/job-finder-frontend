import {createSlice} from "@reduxjs/toolkit";
import {IUser} from "./user.types";
import userApi from "./user.api";
import {RootState} from "../store";

export type TAuthModalType = "login" | "registration" | false

const INITIAL_STATE = {
    user: null
} as {
    user: IUser | null
}

const userSlice = createSlice({
	name: "user",
	initialState: INITIAL_STATE,
	reducers: {},
	extraReducers: (builder) => {
        builder.addMatcher(userApi.endpoints.userInfo.matchFulfilled, (state, {payload}) => {
            state.user = {...state.user, ...payload};
        });
        builder.addMatcher(userApi.endpoints.updateDeveloperInfo.matchFulfilled, (state, {payload}) => {
            state.user = {...state.user, ...payload};
        });
        builder.addMatcher(userApi.endpoints.postUserType.matchFulfilled, (state, {payload}) => {
            state.user = {...state.user, ...payload};
        });
	}
});

export const {} = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state: RootState) => state.user.user;
