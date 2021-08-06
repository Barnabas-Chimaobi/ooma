import {createSlice} from '@reduxjs/toolkit';


export interface newMenuItemByCategoryState {
    payload:[]
  }


  const initialState: newMenuItemByCategoryState = {
    payload:[]
  };


  const menuItemByCategorySlice = createSlice({
    name: 'menuItemsByCategory',
    initialState,
    reducers: {
      useMenuItemByCategory:  (state, {payload})  => {
        state.payload = payload
        return state
      },
      
      
    },
  });
  
  export const {
    actions: {useMenuItemByCategory},
  } = menuItemByCategorySlice;
  
  export default menuItemByCategorySlice.reducer;