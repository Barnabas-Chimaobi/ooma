import {createSlice} from '@reduxjs/toolkit';


export interface menuItemPlanForYouState {
    payload:[]
  }


  const initialState: menuItemPlanForYouState = {
    payload:[]
  };


  const menuItemPlanForYouSlice = createSlice({
    name: 'menuItemPlanForYou',
    initialState,
    reducers: {
      getMenuItemsPlanForYou: (state, {payload}) => {
        state.payload = payload
        return state
      },
      
      
    },
  });
  
  export const {
    actions: {getMenuItemsPlanForYou},
  } = menuItemPlanForYouSlice;
  
  export default menuItemPlanForYouSlice.reducer;