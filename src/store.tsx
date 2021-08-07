import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import counterSlice from './reducers/increment';
import {
  authSlice,
  filterSlice,
  networkManagerSlice,
  menuItemSlice,
  menuItemsSpecialOfferlice,
  newMenuItemSlice,
  popularMenuItemSlice,
  menuItemsForYouSlice,
  menuItemPlanForYouSlice,
  glutenMenuItemSlice,
  drinkMenuItemSlice,
  breakFastMenuItemSlice,
  historyMenuItemslice,
  menuItemByCategorySlice,
  cartSlice,
  menuItemCategorySlice,
  menuPlanCategorySlice,
  basketSlice,
  basketStates,
} from './reducers';
import thunkMiddleware from 'redux-thunk';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    auth: authSlice,
    filter: filterSlice,
    network: networkManagerSlice,
    menuItem: menuItemSlice,
    menuItemsSpecialOffer: menuItemsSpecialOfferlice,
    newMenuItems: newMenuItemSlice,
    popularMenuItems: popularMenuItemSlice,
    menuItemsForYou: menuItemsForYouSlice,
    menuItemPlanForYou: menuItemPlanForYouSlice,
    glutenMenuItem: glutenMenuItemSlice,
    drinkMenuItem: drinkMenuItemSlice,
    breakFastMenuItem: breakFastMenuItemSlice,
    historyMenuItems: historyMenuItemslice,
    menuItemsByCategory: menuItemByCategorySlice,
    addedCart: cartSlice,
    itemCategory: menuItemCategorySlice,
    menuPlanCategories: menuPlanCategorySlice,
    basketState: basketSlice,
  },
  middleware: [
    ...getDefaultMiddleware({immutableCheck: false}),
    thunkMiddleware,
  ],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
