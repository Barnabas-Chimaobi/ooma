import {createSlice} from '@reduxjs/toolkit';


export interface MenuItemsHistoryState {
    payload:[]
  }


  const initialState: MenuItemsHistoryState = {
    payload:[]
  };


  const historyMenuItemslice = createSlice({
    name: 'historyMenuItems',
    initialState,
    reducers: {
      getMenuItemsHistory: (state, {payload}) => {
        state.payload = payload
        return state
      },
      
      
    },
  });
  
  export const {
    actions: {getMenuItemsHistory},
  } = historyMenuItemslice;
  
  export default historyMenuItemslice.reducer;