import {createSlice} from '@reduxjs/toolkit';


export interface drinkMenuItemState {
    payload:[]
  }


  const initialState: drinkMenuItemState = {
    payload:[]
  };


  const drinkMenuItemSlice = createSlice({
    name: 'drinkMenuItem',
    initialState,
    reducers: {
      getDrinkMenuItems: (state, {payload}) => {
        state.payload = payload
        return state
      },
      
      
    },
  });
  
  export const {
    actions: {getDrinkMenuItems},
  } = drinkMenuItemSlice;
  
  
  export default drinkMenuItemSlice.reducer;