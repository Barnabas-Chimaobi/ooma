import {createSlice} from '@reduxjs/toolkit';


export interface menuItemSpecialOfferState {
    payload:[]
  }


  const initialState: menuItemSpecialOfferState = {
    payload:[]
  };


  const menuItemsSpecialOfferlice = createSlice({
    name: 'menuItemsSpecialOffer',
    initialState,
    reducers: {
      getSpecialOffer: (state, {payload}) => {
        state.payload = payload
        return state
      },
      
      
    },
  });
  
  export const {
    actions: {getSpecialOffer},
  } = menuItemsSpecialOfferlice;
  
  export default menuItemsSpecialOfferlice.reducer;