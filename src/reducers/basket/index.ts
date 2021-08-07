import {createSlice} from '@reduxjs/toolkit';

export interface basketState {
    payload:[]
  }


  const initialState: basketState = {
    payload:[]
  };


  const basketSlice = createSlice({
    name: 'basketState',
    initialState,
    reducers: {
      basketStates: (state, {payload}) => {
        state.payload = payload
        return state
      },
      
      
    },
  });
  
  export const {
    actions: {basketStates},
  } = basketSlice;
  
  export default basketSlice.reducer;