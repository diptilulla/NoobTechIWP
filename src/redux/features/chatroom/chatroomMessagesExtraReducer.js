import {
  deleteChatroomMessage,
  getAllChatroomMessages,
  setChatroomMessage
} from "./chatroomMessagesThunk";
import { chatroomsAdaptor } from "./chatroomSlice";
import { sendSocketG } from "../../../services/socket/socket";

export const chatroomMessagesExtraReducer = (chatroomMessagesAdaptor) => ({
  [getAllChatroomMessages.pending]: (state) => {
    state.messages.status = "get loading";
  },

  [getAllChatroomMessages.rejected]: (state, { error }) => {
    state.messages.status = "failed";
    state.messages.error = error;
  },

  [getAllChatroomMessages.fulfilled]: (state, { payload, meta: { arg } }) => {
    if (payload.success) {
      if (payload.data.length) {
        chatroomMessagesAdaptor.addMany(state.messages, payload.data);
        chatroomsAdaptor.updateOne(state, {
          id: arg.chatroom_id,
          changes: {
            messages: [
              ...state.entities[arg.chatroom_id].messages,
              ...payload.data.map((message) => message._id)
            ]
          }
        });
      }
      state.messages.status = "get complete";
    }
  },

  [setChatroomMessage.fulfilled]: (state, { payload, meta: { arg } }) => {
    if (payload.data.success) {
      sendSocketG({ op: "create", ...payload.data.data }, payload.socket);
      chatroomMessagesAdaptor.addOne(state.messages, payload.data.data);
      chatroomsAdaptor.updateOne(state, {
        id: arg.messageDetails.chatroom_id,
        changes: {
          messages: [
            ...state.entities[arg.messageDetails.chatroom_id].messages,
            payload.data.data._id
          ]
        }
      });
      state.messages.status = "set complete";
    } else {
      state.messages.success = "failed";
      state.messages.error = payload.data.data;
    }
  },
  [setChatroomMessage.rejected]: (state, { error }) => {
    state.messages.status = "failed";
    state.messages.error = error;
  },

  [deleteChatroomMessage.fulfilled]: (state, { meta: { arg }, payload }) => {
    if (payload.data.success) {
      sendSocketG(
        {
          op: "delete",
          chatroom_id: arg.chatroom_id,
          _id: arg._id,
          user_id: arg.user_id
        },
        payload.socket
      );
      chatroomMessagesAdaptor.removeOne(state.messages, arg._id);
      chatroomsAdaptor.updateOne(state, {
        id: arg.chatroom_id,
        changes: {
          messages: state.entities[arg.chatroom_id].messages.filter(
            (mid) => mid !== arg._id
          )
        }
      });
      state.messages.status = "delete success";
    } else {
      state.messages.success = "failed";
      state.messages.error = payload.data.data;
    }
  },
  [deleteChatroomMessage.rejected]: (state, { error }) => {
    state.messages.status = "failed";
    state.messages.error = error;
  }
});
