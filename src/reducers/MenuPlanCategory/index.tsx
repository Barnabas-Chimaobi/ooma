import {createSlice} from '@reduxjs/toolkit';


export interface menuPlanCategoryState {
    menuPlanCategories:[]
  }


  const initialState: menuPlanCategoryState = {
    menuPlanCategories:[]
  };


  const menuPlanCategorySlice = createSlice({
    name: 'menuPlanCategory',
    initialState,
    reducers: {
        useMenuPlanCategory: (state, {payload}) => {
        state.menuPlanCategories = payload
        return state
      },
      
      
    },
  });
  
  export const {
    actions: {useMenuPlanCategory},
  } = menuPlanCategorySlice;
  
  export default menuPlanCategorySlice.reducer;