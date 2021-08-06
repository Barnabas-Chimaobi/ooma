import {createSlice} from '@reduxjs/toolkit';


export interface breakFastMenuItemState {
    payload:[]
  }


  const initialState: breakFastMenuItemState = {
    payload:[]
  };


  const breakFastMenuItemSlice = createSlice({
    name: 'breakFastMenuItem',
    initialState,
    reducers: {
      getBreakFastMenuItems: (state, {payload}) => {
        state.payload = payload
        return state
      },
      
      
    },
  });
  
  export const {
    actions: {getBreakFastMenuItems},
  } = breakFastMenuItemSlice;
  
  export default breakFastMenuItemSlice.reducer;