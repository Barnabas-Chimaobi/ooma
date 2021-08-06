import {createSlice} from '@reduxjs/toolkit';


export interface glutenMenuItemState {
    payload:[]
  }


  const initialState: glutenMenuItemState = {
    payload:[]
  };


  const glutenMenuItemSlice = createSlice({
    name: 'glutenMenuItem',
    initialState,
    reducers: {
      getGlutenMenuItems: (state, {payload}) => {
        state.payload = payload
        return state
      },
      
      
    },
  });
  
  export const {
    actions: {getGlutenMenuItems},
  } = glutenMenuItemSlice;
  getGlutenMenuItems
  
  export default glutenMenuItemSlice.reducer;