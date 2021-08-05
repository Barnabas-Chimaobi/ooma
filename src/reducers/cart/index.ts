import {createSlice} from '@reduxjs/toolkit';

export interface cartState {
    payload:[]
  }


  const initialState: cartState = {
    payload:[]
  };


  const cartSlice = createSlice({
    name: 'cartState',
    initialState,
    reducers: {
      cartStates: (state, {payload}) => {
        state.payload = payload
        return state
      },
      
      
    },
  });
  
  export const {
    actions: {cartStates},
  } = cartSlice;
  
  export default cartSlice.reducer;