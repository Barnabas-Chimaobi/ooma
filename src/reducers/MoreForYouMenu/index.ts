import {createSlice} from '@reduxjs/toolkit';


export interface MenuItemsForYouState {
    payload:[]
  }


  const initialState: MenuItemsForYouState = {
    payload:[]
  };


  const menuItemsForYouSlice = createSlice({
    name: 'menuItemsForYou',
    initialState,
    reducers: {
      getMenuItemsForYou: (state, {payload}) => {
        state.payload = payload
        return state
      },
      
      
    },
  });
  
  export const {
    actions: {getMenuItemsForYou},
  } = menuItemsForYouSlice;
  
  export default menuItemsForYouSlice.reducer;