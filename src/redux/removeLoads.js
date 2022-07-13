import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const removemodalSlice = createSlice({
  name: "removeModal",
  initialState,
  reducers: {
    removeOpenModal: (state) => {
      state.isOpen = true;
      
    },
    removeCloseModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { removeOpenModal, removeCloseModal } = removemodalSlice.actions;
export default removemodalSlice.reducer;
