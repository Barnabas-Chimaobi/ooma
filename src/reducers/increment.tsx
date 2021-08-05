import {createSlice} from '@reduxjs/toolkit';

export interface CounterState {
  value: number;
  isLoading: boolean;
}

const initialState: CounterState = {value: 0, isLoading: false};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state, {payload}) => {
      state.isLoading = true;
      void (state.value += payload);
    },
    decrement: (state, action) => void (state.value -= action.payload),
    clear: (state) => {
      state.isLoading = false;
      void (state.value = 0);
    },
  },
});

export const {
  actions: {increment, decrement, clear},
} = counterSlice;

export default counterSlice.reducer;
