import { createSlice } from "@reduxjs/toolkit";
import { IPredict } from "./user.types";
import authApi from "../auth/auth.api";
import userApi from "./user.api";

export type TAuthModalType = "login" | "registration" | false

const INITIAL_STATE = {
  predictPrice: undefined,
} as {
  predictPrice?: IPredict
}

const userSlice = createSlice({
	name: "user",
	initialState: INITIAL_STATE,
	reducers: {},
	extraReducers: (builder) => {
    builder.addMatcher(userApi.endpoints.predictPrice.matchFulfilled, (state, { payload }) => {
      state.predictPrice = payload;
    });
	}
});

export const {} = userSlice.actions;

export default userSlice.reducer;

// export const selectToken = (state: RootState) => state.auth.token;
