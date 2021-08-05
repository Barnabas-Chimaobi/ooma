import {createSlice} from '@reduxjs/toolkit';


export interface PopularMenuItemState {
    payload:[]
  }


  const initialState: PopularMenuItemState = {
    payload:[]
  };


  const popularMenuItemSlice = createSlice({
    name: 'popularMenuItems',
    initialState,
    reducers: {
      getPopularItem: (state, {payload}) => {
        state.payload = payload
        return state
      },
      
      
    },
  });
  
  export const {
    actions: {getPopularItem},
  } = popularMenuItemSlice;
  
  export default popularMenuItemSlice.reducer;