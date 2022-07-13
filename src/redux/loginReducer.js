import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  password: '',
  repeatpassword: '',
  user: '',
  username: '',
};

const userLoginSlice = createSlice({
  name: 'userLogin',
  initialState,
  reducers: {
    resetPassword: (state, value) => {
      const emailaddress = value.payload;
      console.log(emailaddress);
      axios
        .get('https://razordispatchback.herokuapp.com/api/users/', emailaddress)
        .catch((err) => console.log(err));
    },
  },
});

export const { resetPassword } = userLoginSlice.actions;
export default userLoginSlice.reducer;
