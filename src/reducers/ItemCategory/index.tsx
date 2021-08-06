import {createSlice} from '@reduxjs/toolkit';


export interface newMenuItemCategoryState {
    categories:[]
  }


  const initialState: newMenuItemCategoryState = {
    categories:[]
  };


  const menuItemCategorySlice = createSlice({
    name: 'menuItemsCategory',
    initialState,
    reducers: {
      useMenuItemCategory: (state, {payload}) => {
        state.categories = payload
        return state
      },
      
      
    },
  });
  
  export const {
    actions: {useMenuItemCategory},
  } = menuItemCategorySlice;
  
  export default menuItemCategorySlice.reducer;