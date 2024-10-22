import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '~/types/auth';

type IAuthState = {
  isLoggedIn: boolean;
  token: string | null;
  user: IUser | null;
};

const initialState: IAuthState = {
  isLoggedIn: false,
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, { payload }) {
      const { accessToken } = payload;
      state.token = accessToken;
      state.isLoggedIn = true;
      state.user = payload.user;
    },
    // setToken(state, { payload }) {
    //   const { token } = payload;
    //   state.token = token;
    // },
    logout(state) {
      state.isLoggedIn = initialState.isLoggedIn;
      state.token = null;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
