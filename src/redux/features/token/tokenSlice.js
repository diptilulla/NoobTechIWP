import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
  name: "token",
  initialState: {
    refreshToken: null,
    accessToken: null,
  },
  reducers: {
    setAccessToken(state, { payload }) {
      state.accessToken = payload;
    },
    setRefreshToken(state, { payload }) {
      state.refreshToken = payload;
    },
    unsetToken(state) {
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setAccessToken, setRefreshToken, unsetToken } =
  tokenSlice.actions;

export const selectAccessToken = (state) => state.token.accessToken;

export const selectRefreshToken = (state) => state.token.refreshToken;

export default tokenSlice.reducer;
