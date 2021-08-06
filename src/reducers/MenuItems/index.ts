import {createSlice} from '@reduxjs/toolkit';


export interface menuItemState {
    payload:[]
  }


  const initialState: menuItemState = {
    payload:[]
  };


  const menuItemSlice = createSlice({
    name: 'menuItem',
    initialState,
    reducers: {
      getMenuItems: (state, {payload}) => {
        state.payload = payload
        return state
      },
      
      
    },
  });
  
  export const {
    actions: {getMenuItems},
  } = menuItemSlice;
  
  export default menuItemSlice.reducer;