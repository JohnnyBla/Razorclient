import { createSlice } from "@reduxjs/toolkit/";
import { Register } from "../shared/FormHandler/userRegister";

const initialState = {
  Register,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    deleteUser: (state, values) => {},
  },
});

export const { deleteUser } = registerSlice.actions;
export default registerSlice.reducer;
