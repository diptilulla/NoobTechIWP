import { store } from "../../store";
import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  deletetask,
  droptask,
  getallchatroomtasks,
  movetask,
  settask
} from "../../../services/chatroom/tasks";

export const getAllChatroomTasks = createAsyncThunk(
  "chatrooms/tasks/getallchatroomtasks",
  async (details) => {
    return getallchatroomtasks(details);
  }
);

export const moveTask = createAsyncThunk(
  "chatrooms/tasks/movetask",
  async (details) => {
    return movetask(details);
  }
);

export const dropTask = createAsyncThunk(
  "chatrooms/tasks/droptask",
  async (details) => {
    return droptask(details);
  }
);

export const deleteTask = createAsyncThunk(
  "chatrooms/tasks/deletetask",
  async ({ _id, chatroom_id }) => {
    return deletetask({ _id, chatroom_id });
  }
);

export const setTask = createAsyncThunk(
  "chatrooms/tasks/settask",
  async ({ taskDetails, setShowForm }) => {
    const data = await settask(taskDetails);
    if (data.success) {
      setShowForm(false);
    }
    return data;
  }
);
