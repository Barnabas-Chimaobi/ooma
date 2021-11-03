import {createSlice} from '@reduxjs/toolkit';

export interface itemOrderState {
  payload: [];
}

const initialState: itemOrderState = {
  payload: [],
};

const itemOrderSlice = createSlice({
  name: 'itemOrderState',
  initialState,
  reducers: {
    itemOrderStates: (state, {payload}) => {
      state.payload = payload;
      return state;
    },
  },
});

export const {
  actions: {itemOrderStates},
} = itemOrderSlice;

export default itemOrderSlice.reducer;
