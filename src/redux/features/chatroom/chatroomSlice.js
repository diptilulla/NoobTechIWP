import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from "@reduxjs/toolkit";
import {
  deletechatroom,
  getallchatrooms,
  getallinterestchatrooms,
  getalluserchatrooms,
  getchatroom,
  joinchatroom,
  leavechatroom,
  setchatroom
} from "../../../services/chatroom/chatroom";
import { chatroomMessagesExtraReducer } from "./chatroomMessagesExtraReducer";
import { chatroomTasksExtraReducer } from "./chatroomTasksExtraReducer";

export const getChatroom = createAsyncThunk(
  "chatrooms/getchatroom",
  async (chatroomDetails) => {
    return getchatroom(chatroomDetails);
  }
);

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
  async (details) => {
    return deletechatroom(details);
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

export const setChatroom = createAsyncThunk(
  "chatrooms/setchatroom",
  async ({ chatroomDetails, navigate, path }) => {
    const data = await setchatroom(chatroomDetails);
    if (data.success) navigate(path);
    return data;
  }
);

export const chatroomsAdaptor = createEntityAdapter({
  selectId: (chatroom) => chatroom._id
});

const chatroomMessagesAdaptor = createEntityAdapter({
  selectId: (message) => message._id
});

const chatroomTasksAdaptor = createEntityAdapter({
  selectId: (task) => task._id
});

const chatroomsSlice = createSlice({
  name: "chatrooms",
  initialState: chatroomsAdaptor.getInitialState({
    status: null,
    error: null,
    userRooms: [],
    interestedRooms: [],
    messages: chatroomMessagesAdaptor.getInitialState({
      status: null,
      error: null
    }),
    tasks: chatroomTasksAdaptor.getInitialState({
      status: null,
      error: null
    })
  }),
  reducers: {
    unsetInterestedRooms(state) {
      state.interestedRooms = [];
    },
    socketSetChatroomMessage(state, { payload }) {
      const { op, ...messageDetails } = payload;
      chatroomMessagesAdaptor.addOne(state.messages, messageDetails);
      chatroomsAdaptor.updateOne(state, {
        id: messageDetails.chatroom_id,
        changes: {
          messages: [
            ...state.entities[messageDetails.chatroom_id].messages,
            messageDetails._id
          ]
        }
      });
    },
    socketDeleteChatroomMessage(state, { payload: { _id, chatroom_id } }) {
      chatroomMessagesAdaptor.removeOne(state.messages, _id);
      chatroomsAdaptor.updateOne(state, {
        id: chatroom_id,
        changes: {
          messages: state.entities[chatroom_id].messages.filter(
            (id) => id !== _id
          )
        }
      });
    }
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
        chatroomsAdaptor.addMany(
          state,
          payload.data.map((chatroom) => {
            return { ...chatroom, messages: [] };
          })
        );
        state.userRooms = [
          ...state.userRooms,
          ...payload.data.map((chatroom) => chatroom._id)
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
        chatroomsAdaptor.addMany(
          state,
          payload.data.map((chatroom) => {
            return { ...chatroom, messages: [] };
          })
        );
        state.status = "success";
      } else {
        state.status = "failed";
        state.error = payload.data;
      }
    },
    [getChatroom.pending]: (state) => {
      state.status = "get loading";
    },
    [getChatroom.rejected]: (state, { error }) => {
      state.status = "failed";
      state.error = error;
    },
    [getChatroom.fulfilled]: (state, { payload }) => {
      if (payload.success) {
        chatroomsAdaptor.addOne(state, {
          ...payload.data,
          messages: []
        });
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
        state.userRooms = [...state.userRooms, arg.chatroom_id];
        state.status = "join complete";
      } else {
        state.status = "failed";
        state.error = payload.data;
      }
    },
    [setChatroom.rejected]: (state, { error }) => {
      state.status = "failed";
      state.error = error;
    },
    [setChatroom.fulfilled]: (state, { payload }) => {
      if (payload.success) {
        chatroomsAdaptor.addOne(state, {
          ...payload.data,
          messages: [],
          tasks: []
        });
        state.userRooms = [...state.userRooms, payload.data._id];
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
        chatroomsAdaptor.addMany(
          state,
          payload.data.map((chatroom) => {
            return { ...chatroom, messages: [] };
          })
        );
        state.interestedRooms = [
          ...state.interestedRooms,
          ...payload.data.map((chatroom) => chatroom._id)
        ];
        state.status = "success";
      } else {
        state.status = "failed";
        state.error = payload.data;
      }
    },

    [deleteChatroom.rejected]: (state, { error }) => {
      state.status = "failed";
      state.error = error;
    },

    [deleteChatroom.fulfilled]: (state, { meta: { arg }, payload }) => {
      if (payload.success) {
        console.log({arg})
        chatroomsAdaptor.removeOne(state, arg.chatroom_id);
        state.userRooms = state.userRooms.filter(
          (cid) => cid !== arg.chatroom_id
        );
        state.status = "delete success";
      } else {
        state.status = "failed";
        state.error = payload.data;
      }
    },
    ...chatroomMessagesExtraReducer(chatroomMessagesAdaptor),
    ...chatroomTasksExtraReducer(chatroomTasksAdaptor)
  }
});

export const chatroomsSelector = chatroomsAdaptor.getSelectors(
  (state) => state.chatrooms
);

export const {
  unsetInterestedRooms,
  socketSetChatroomMessage,
  socketDeleteChatroomMessage
} = chatroomsSlice.actions;

export const selectChatroomsStatus = (state) => state.chatrooms.status;
export const selectChatroomMessagesStatus = (state) =>
  state.chatrooms.messages.status;
export const selectChatroomTasksStatus = (state) =>
  state.chatrooms.tasks.status;
export default chatroomsSlice.reducer;
