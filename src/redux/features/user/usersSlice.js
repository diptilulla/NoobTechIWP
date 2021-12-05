import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logIn, register } from "../../../services/auth/auth";
import { getProfile, unsetProfile } from "../profile/profileSlice";
import { setPopup } from "../popup/popupSlice";
import { getAllUserChatrooms } from "../chatroom/chatroomSlice";

export const signIn = createAsyncThunk(
  "user/signin",
  async ({ signinDetails, navigate }, { dispatch }) => {
    const data = await logIn(signinDetails);
    console.log(data);
    if (data.success) {
      dispatch(getProfile({ user_id: data.data.id }));
      dispatch(getAllUserChatrooms({ user_id: data.data.id }));
      dispatch(setPopup());
      navigate("/profile");
    }
    return data;
  }
);

export const signUp = createAsyncThunk(
  "user/signup",
  async ({ signupDetails, navigate }, { dispatch }) => {
    const data = await register(signupDetails);
    if (data.success) {
      dispatch(setPopup());
      navigate("/profile/edit");
    }
    return data;
  }
);

export const signOut = createAsyncThunk(
  "user/signout",
  async (navigate, { dispatch }) => {
    dispatch(unsetProfile());
    navigate("/");
  }
);

const usersSlice = createSlice({
  name: "user",
  initialState: { currentUser: null, error: null, status: null },
  reducers: {
    setUser(state, { payload: { currentUser, error } }) {
      if (error) state.error = error;
      else {
        state.status = "success";
        state.currentUser = currentUser;
      }
    },
    deleteUser(state) {
      state.currentUser = null;
      state.error = null;
      state.status = null;
    },
  },

  extraReducers: {
    [signIn.pending]: (state) => {
      state.status = "signin loading";
    },
    [signIn.fulfilled]: (state, { payload, meta: { arg } }) => {
      const { success, data } = payload;
      if (success) {
        state.currentUser = { email: arg.signinDetails.email, id: data.id };
        state.status = "success";
        state.error = null;
      } else {
        state.error = data;
        state.status = "failed";
      }
    },
    [signIn.rejected]: (state, { error }) => {
      state.status = "failed";
      state.error = error;
    },
    [signUp.pending]: (state) => {
      state.status = "loading";
    },
    [signUp.fulfilled]: (state, { payload, meta: { arg } }) => {
      const { success, data } = payload;
      if (success) {
        state.currentUser = { email: arg.signupDetails.email, id: data.id };
        state.status = "success";
        state.error = null;
      } else {
        state.status = "failed";
        state.error = data;
      }
    },
    [signUp.rejected]: (state, { error }) => {
      state.status = "failed";
      state.error = error;
    },
    [signOut.pending]: (state) => {
      state.status = "loading";
    },
    [signOut.fulfilled]: (state) => {
      state.currentUser = null;
      state.status = "success";
      state.error = null;
    },
  },
});

export const selectUser = (state) => state.user.currentUser;

export const selectUserStatus = (state) => state.user.status;

export const { setUser, deleteUser } = usersSlice.actions;

export default usersSlice.reducer;
