import { createSlice } from "@reduxjs/toolkit";
import { disconnect } from "../../../app/services/socket/socket";

const peerSlice = createSlice({
  name: "peer",
  initialState: { peer: null },
  reducers: {
    setPeer(state, { payload }) {
      state.peer = payload;
    },
    deletePeer(state) {
      state.peer = null;
    },
    disconnectPeer(state, { payload: { socket, user_id } }) {
      disconnect(socket, {
        user_id,
        rprofile_b: state.peer.peer_id,
        rprofile_b_name: state.peer.peer_name,
      });
    },
  },
});

export const { setPeer, deletePeer, disconnectPeer } = peerSlice.actions;

export const selectPeer = (state) => state.peer.peer;

export default peerSlice.reducer;
