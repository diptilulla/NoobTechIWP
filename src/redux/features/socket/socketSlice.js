import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socket",
  initialState: { chatroomSocket: null },
  reducers: {
    setChatroomSocket(state, { payload }) {
      state.chatroomSocket = payload;
    },
    deleteChatroomSocket(state) {
      state.chatroomSocket = null;
    },
  },
});

export const { setChatroomSocket, deleteChatroomSocket } = socketSlice.actions;

export const selectChatroomSocket = (state) => state.socket.chatroomSocket;

export default socketSlice.reducer;
