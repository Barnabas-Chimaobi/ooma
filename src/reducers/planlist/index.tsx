import {createSlice} from '@reduxjs/toolkit';

export interface planState {
  payload: [];
}

const initialState: planState = {
  payload: [],
};

const planSlice = createSlice({
  name: 'planState',
  initialState,
  reducers: {
    planStates: (state, {payload}) => {
      state.payload = payload;
      return state;
    },
  },
});

export const {
  actions: {planStates},
} = planSlice;

export default planSlice.reducer;
