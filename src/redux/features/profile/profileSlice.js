import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  deleteprofile,
  getprofile,
  setprofile,
} from "../../../services/profile/profile";

import { deleteFile, upLoadFile } from "../../../services/media/media";
import { deleteUser } from "../user/usersSlice";
import { store } from "../../store";

export const getProfile = createAsyncThunk(
  "profile/getprofile",
  async (userDetails) => {
    return getprofile(userDetails);
  }
);

export const deleteProfile = createAsyncThunk(
  "profile/deleteprofile",
  async ({ userDetails, navigate }, { dispatch }) => {
    const data = await deleteprofile(userDetails);
    if (data.success) {
      const reduxState = store.getState();
      const profile_img = reduxState.profile.profile.profile_img;
      if (profile_img) {
        await deleteFile({
          file_name: profile_img.split(".com/")[1],
        });
      }
      dispatch(deleteUser());
      navigate("/");
    }
    return data;
  }
);

export const deleteProfileImage = createAsyncThunk(
  "profile/deleteprofileimage",
  async () => {
    const reduxState = store.getState();
    const profile = reduxState.profile.profile;
    const data = await setprofile({ ...profile, profile_image: null });
    if (data.success) {
      if (profile.profile_img) {
        await deleteFile({
          file_name: profile.profile_img.split(".com/")[1],
        });
      }
    }
    return data;
  }
);

export const setEditProfile = createAsyncThunk(
  "profile/setprofile",
  async (
    { profileDetails, oldProfileDetails, navigate, path },
    { dispatch }
  ) => {
    let newDetails = profileDetails;
    if (profileDetails.id) {
      if (newDetails.user_name === oldProfileDetails.user_name)
        delete newDetails.user_name;
      if (profileDetails.profile_img) {
        if (oldProfileDetails.profile_img) {
          const deleteOldFile = await deleteFile({
            file_name: oldProfileDetails.profile_img.split(".com/")[1],
          });
          if (!deleteOldFile.success) return { data: deleteOldFile };
        }
        const fileData = new FormData();
        fileData.append("file", profileDetails.profile_img);
        const fileRes = await upLoadFile(fileData);
        console.log({ fileRes });
        if (fileRes.success) newDetails.profile_img = fileRes.url_media;
        else return { data: fileRes };
      } else {
        newDetails.profile_img = oldProfileDetails.profile_img;
      }
    } else {
      if (profileDetails.profile_img) {
        const fileData = new FormData();
        fileData.append("file", profileDetails.profile_img);
        const fileRes = await upLoadFile(fileData);
        console.log({ fileRes });
        if (fileRes.success) newDetails.profile_img = fileRes.url_media;
        else return { data: fileRes };
      }
    }
    console.log(newDetails);
    const data = await setprofile(newDetails);
    if (data.success) navigate(path);
    return data;
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    status: null,
    error: null,
  },
  reducers: {
    unsetProfile(state) {
      state.profile = null;
      state.status = null;
      state.error = null;
    },
  },
  extraReducers: {
    [getProfile.pending]: (state) => {
      state.status = "get loading";
    },
    [getProfile.rejected]: (state, { error }) => {
      state.status = "failed";
      state.error = error;
    },
    [getProfile.fulfilled]: (state, { payload }) => {
      const { success, data } = payload;
      if (success) {
        state.profile = data;
        state.status = "success";
      } else {
        state.profile = null;
        state.status = "failed";
        state.error = data;
      }
    },
    [setEditProfile.fulfilled]: (state, { payload }) => {
      const { success, data } = payload;
      if (success) {
        state.status = "success";
        state.profile = data;
      } else {
        state.status = "failed";
        state.error = data;
      }
    },
    [setEditProfile.rejected]: (state, { error }) => {
      state.status = "failed";
      state.error = error;
    },
    [deleteProfileImage.fulfilled]: (state, { payload }) => {
      if (payload.success) {
        state.status = "success";
        state.profile = payload.data;
      } else {
        state.status = "failed";
        state.error = payload.data;
      }
    },
    [deleteProfileImage.rejected]: (state, { error }) => {
      state.status = "failed";
      state.error = error;
    },
    [deleteProfile.rejected]: (state, { error }) => {
      state.status = "failed";
      state.error = error;
    },
    [deleteProfile.fulfilled]: (state, { payload }) => {
      if (payload.success) {
        state.profile = null;
        state.status = "delete success";
      } else {
        state.status = "failed";
        state.error = payload.data;
      }
    },
  },
});

export const { unsetProfile } = profileSlice.actions;
export const selectProfile = (state) => state.profile.profile;
export const selectProfileStatus = (state) => state.profile.status;

export default profileSlice.reducer;
