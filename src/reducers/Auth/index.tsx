import {createSlice} from '@reduxjs/toolkit';

export interface authState {
  token: boolean;
  isLoading: boolean;
  number: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  code: string;
  hash: string;
}

const initialState: authState = {
  token: false,
  isLoading: true,
  number: '',
  password: '',
  firstName: '',
  lastName: '',
  confirmPassword: '',
  code: '',
  hash: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state) => {
      state.isLoading = false;
      state.token = true;
    },
    signOut: (state) => {
      state.token = false;
    },
    reset: (state) => initialState,
    setUserDetails: (state, {payload}) => {
      payload.firstName
        ? (state.firstName = payload.firstName)
        : state.firstName;
      payload.lastName ? (state.lastName = payload.lastName) : state.lastName;
      payload.password ? (state.password = payload.password) : state.password;
      payload.confirmPassword
        ? (state.confirmPassword = payload.confirmPassword)
        : state.confirmPassword;
      payload.number ? (state.number = payload.number) : state.number;
      payload.code ? (state.code = payload.code) : state.code;
      payload.hash ? (state.hash = payload.hash) : state.hash;
    },
  },
});

export const {
  actions: {signIn, signOut, reset, setUserDetails},
} = authSlice;

export default authSlice.reducer;
