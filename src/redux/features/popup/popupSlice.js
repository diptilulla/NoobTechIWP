import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: { popup: false },
  reducers: {
    setPopup(state) {
      state.popup = !state.popup;
    },
  },
});

export const { setPopup } = popupSlice.actions;

export const selectPopup = (state) => state.popup.popup;

export default popupSlice.reducer;
