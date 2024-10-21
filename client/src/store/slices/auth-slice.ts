import { createSlice } from '@reduxjs/toolkit';

type IAuthState = {
  isLoggedIn: boolean;
  token: string | null;
  username: string | null;
  email: string | null;
};

const initialState: IAuthState = {
  isLoggedIn: false,
  token: null,
  username: null,
  email: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, { payload }) {
      const { accessToken, username, email } = payload;
      state.token = accessToken;
      state.isLoggedIn = true;
      state.username = username;
      state.email = email;
    },
    // setToken(state, { payload }) {
    //   const { token } = payload;
    //   state.token = token;
    // },
    logout(state) {
      state.isLoggedIn = initialState.isLoggedIn;
      state.token = null;
      state.username = null;
      state.email = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
