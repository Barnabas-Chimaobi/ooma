import {createSlice} from '@reduxjs/toolkit';

export interface authState {
  toggleNetwork: boolean;
}

const initialState: authState = {
  toggleNetwork: true,
};

const networkManagerSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    checkNetwork: (state: any, {payload}) => {
      state.toggleNetwork = payload;
    },
  },
});

export const {
  actions: {checkNetwork},
} = networkManagerSlice;

export default networkManagerSlice.reducer;
