import { createAsyncThunk } from "@reduxjs/toolkit";
import { store } from "../../store";
import {
  deletechatroommessage,
  getallchatroommessages,
  setchatroommessage,
} from "../../../services/chatroom/messages";

export const getAllChatroomMessages = createAsyncThunk(
  "chatrooms/messages/getallchatroommessages",
  async (details) => {
    return getallchatroommessages(details);
  }
);

export const deleteChatroomMessage = createAsyncThunk(
  "chatrooms/messages/deletechatroommessage",
  async ({ _id, chatroom_id }) => {
    const data = await deletechatroommessage({ _id, chatroom_id });
    const reduxState = store.getState();
    const socket = reduxState.socket.chatroomSocket;
    return { data, socket };
  }
);

export const setChatroomMessage = createAsyncThunk(
  "chatrooms/messages/setchatroommessage",
  async ({ messageDetails, setNewMessage }) => {
    const data = await setchatroommessage(messageDetails);
    if (data.success) {
      if (setNewMessage) setNewMessage("");
    }
    const reduxState = store.getState();
    const socket = reduxState.socket.chatroomSocket;
    return {
      data,
      socket,
    };
  }
);
