import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import {
  deletechatroom,
  getallchatrooms,
  getallinterestchatrooms,
  getalluserchatrooms,
  joinchatroom,
  leavechatroom,
} from "../../../services/chatroom/chatroom";

export const getAllUserChatrooms = createAsyncThunk(
  "chatrooms/getalluserchatrooms",
  async (details) => {
    return getalluserchatrooms(details);
  }
);

export const getAllInterestChatrooms = createAsyncThunk(
  "chatrooms/getallinterestchatrooms",
  async (details) => {
    return getallinterestchatrooms(details);
  }
);

export const getAllChatrooms = createAsyncThunk(
  "chatrooms/getchatrooms",
  async (details) => {
    return getallchatrooms(details);
  }
);

export const deleteChatroom = createAsyncThunk(
  "chatrooms/deletechatroom",
  async ({ id }) => {
    return deletechatroom({ id });
  }
);

export const joinChatroom = createAsyncThunk(
  "chatrooms/joinchatroom",
  async (details) => {
    return joinchatroom(details);
  }
);

export const leaveChatroom = createAsyncThunk(
  "chatrooms/leavechatroom",
  async (details) => {
    return leavechatroom(details);
  }
);

// export const setEditChatroom = createAsyncThunk(
//   "chatrooms/setchatroom",
//   async ({
//     chatroomDetails,
//     oldChatroomDetails,
//     // setIsAnnouncement,
//   }) => {
//     let data;
//     let newDetails = chatroomDetails;
//     if (chatroomDetails.id) {
//       delete newDetails.creator_id;
//       delete newDetails.creator_name;

//       if (newDetails.name === oldAnnouncementDetails.name)
//         delete newDetails.name;
//       if (newDetails.priority === oldAnnouncementDetails.priority)
//         delete newDetails.priority;
//     }
//     data = await wrapper(setannouncement, {
//       ...newDetails,
//       content: JSON.stringify(newDetails.content),
//     });
//     if (data.success && setIsAnnouncement) setIsAnnouncement(false);
//     return {
//       data,
//       changes: newDetails,
//       id: announcementDetails.id,
//     };
//   }
// );

const chatroomsAdaptor = createEntityAdapter({
  selectId: (chatroom) => chatroom._id,
});

const chatroomsSlice = createSlice({
  name: "chatrooms",
  initialState: chatroomsAdaptor.getInitialState({
    status: null,
    error: null,
    userRooms: [],
    interestedRooms: [],
  }),
  reducers: {
    unsetInterestedRooms(state) {
      state.interestedRooms = [];
    },
  },
  extraReducers: {
    [getAllUserChatrooms.pending]: (state) => {
      state.status = "get loading";
    },
    [getAllUserChatrooms.rejected]: (state, { error }) => {
      state.status = "failed";
      state.error = error;
    },
    [getAllUserChatrooms.fulfilled]: (state, { payload }) => {
      if (payload.success) {
        chatroomsAdaptor.addMany(state, payload.data);
        state.userRooms = [
          ...state.userRooms,
          ...payload.data.map((chatroom) => chatroom._id),
        ];
        state.status = "success";
      } else {
        state.status = "failed";
        state.error = payload.data;
      }
    },
    [getAllChatrooms.pending]: (state) => {
      state.status = "get loading";
    },
    [getAllChatrooms.rejected]: (state, { error }) => {
      state.status = "failed";
      state.error = error;
    },
    [getAllChatrooms.fulfilled]: (state, { payload }) => {
      if (payload.success) {
        chatroomsAdaptor.addMany(state, payload.data);
        state.status = "success";
      } else {
        state.status = "failed";
        state.error = payload.data;
      }
    },
    [joinChatroom.rejected]: (state, { error }) => {
      state.status = "failed";
      state.error = error;
    },
    [joinChatroom.fulfilled]: (state, { payload, meta: { arg } }) => {
      if (payload.success) {
        state.userRooms = [...state.userRooms, arg._id];
        state.status = "success";
      } else {
        state.status = "failed";
        state.error = payload.data;
      }
    },
    [leaveChatroom.rejected]: (state, { error }) => {
      state.status = "failed";
      state.error = error;
    },
    [leaveChatroom.fulfilled]: (state, { payload, meta: { arg } }) => {
      if (payload.success) {
        state.userRooms = state.userRooms.filter((rId) => rId !== arg._id);
        state.status = "success";
      } else {
        state.status = "failed";
        state.error = payload.data;
      }
    },
    [getAllInterestChatrooms.pending]: (state) => {
      state.status = "get loading";
    },
    [getAllInterestChatrooms.rejected]: (state, { error }) => {
      state.status = "failed";
      state.error = error;
    },

    [getAllInterestChatrooms.fulfilled]: (state, { payload }) => {
      if (payload.success) {
        chatroomsAdaptor.addMany(state, payload.data);
        state.interestedRooms = [
          ...state.interestedRooms,
          ...payload.data.map((chatroom) => chatroom._id),
        ];
        state.status = "success";
      } else {
        state.status = "failed";
        state.error = payload.data;
      }
    },

    // [setEditAnnouncement.rejected]: (state, { error }) => {
    //   state.status = "failed";
    //   state.error = error;
    // },
    // [setEditAnnouncement.fulfilled]: (state, { payload, meta: { arg } }) => {
    //   if (payload.data.success) {
    //     if (payload.id) {
    //       chatroomsAdaptor.updateOne(state, {
    //         id: payload.id,
    //         changes: payload.changes,
    //       });
    //       state.status = "edit complete";
    //     } else {
    //       chatroomsAdaptor.addOne(state, payload.data.data);
    //       state.status = "set complete";
    //       state.classAnnouncements = [
    //         ...state.classAnnouncements,
    //         payload.data.data.id,
    //       ];
    //     }
    //   } else {
    //     state.status = "failed";
    //     state.error = payload.data.data;
    //   }
    // },

    [deleteChatroom.rejected]: (state, { error }) => {
      state.status = "failed";
      state.error = error;
    },

    [deleteChatroom.fulfilled]: (state, { meta: { arg }, payload }) => {
      if (payload.success) {
        chatroomsAdaptor.removeOne(state, arg._id);
        state.userRooms = state.userRooms.filter((cid) => cid !== arg._id);
        state.status = "delete success";
      } else {
        state.status = "failed";
        state.error = payload.data;
      }
    },
  },
});

export const chatroomsSelector = chatroomsAdaptor.getSelectors(
  (state) => state.chatrooms
);

export const { unsetInterestedRooms } = chatroomsSlice.actions;

export const selectChatroomsStatus = (state) => state.chatrooms.status;

export default chatroomsSlice.reducer;
