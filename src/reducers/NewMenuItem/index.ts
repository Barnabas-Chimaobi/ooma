import {createSlice} from '@reduxjs/toolkit';


export interface newMenuItemState {
    payload:[]
  }


  const initialState: newMenuItemState = {
    payload:[]
  };


  const newMenuItemSlice = createSlice({
    name: 'newMenuItems',
    initialState,
    reducers: {
      getNewItem: (state, {payload}) => {
        state.payload = payload
        return state
      },
      
      
    },
  });
  
  export const {
    actions: {getNewItem},
  } = newMenuItemSlice;
  
  export default newMenuItemSlice.reducer;