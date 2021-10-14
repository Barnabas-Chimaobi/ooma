import {createSlice} from '@reduxjs/toolkit';

export interface findPlanState {
  payload: [];
}

const initialState: findPlanState = {
  payload: [],
};

const findPlanSlice = createSlice({
  name: 'findPlan',
  initialState,
  reducers: {
    getFindPlan: (state, {payload}) => {
      state.payload = payload;
      return state;
    },
  },
});

export const {
  actions: {getFindPlan},
} = findPlanSlice;

export default findPlanSlice.reducer;
