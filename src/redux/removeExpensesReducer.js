import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const removeExpensesSlice = createSlice({
  name: "removeExpensesModal",
  initialState,
  reducers: {
    removeExpensesOpenModal: (state) => {
      state.isOpen = true;
    },
    removeExpensesCloseModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { removeExpensesOpenModal, removeExpensesCloseModal } =
  removeExpensesSlice.actions;
export default removeExpensesSlice.reducer;
