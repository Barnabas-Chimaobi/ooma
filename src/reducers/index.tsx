import authSlice, {signIn, signOut, reset, setUserDetails} from './Auth';

import filterSlice, {
  usePricing,
  useMaxPricing,
  useMinPricing,
  useCategory,
  useCombination,
  clearAll,
  useFilter,
  visibilityToggle,
} from './Filter';

import networkManagerSlice, {checkNetwork} from './NetworkManager';
import menuItemSlice, {getMenuItems} from './MenuItems';
import menuItemsSpecialOfferlice, {getSpecialOffer} from './SpecialOffer';
import newMenuItemSlice, {getNewItem} from './NewMenuItem';
import popularMenuItemSlice, {getPopularItem} from './PopularItem';
import menuItemsForYouSlice, {getMenuItemsForYou} from './MoreForYouMenu';
import menuItemPlanForYouSlice, {
  getMenuItemsPlanForYou,
} from './MenuPlansForYou';
import glutenMenuItemSlice, {getGlutenMenuItems} from './GlutenFreeMenu';
import drinkMenuItemSlice, {getDrinkMenuItems} from './DrinkMenu';
import breakFastMenuItemSlice, {getBreakFastMenuItems} from './BreakFastMenu';
import historyMenuItemslice, {getMenuItemsHistory} from './HistoryMenu';
import menuItemCategorySlice, {useMenuItemCategory} from './ItemCategory';
import menuPlanCategorySlice, {useMenuPlanCategory} from './MenuPlanCategory';

import menuItemByCategorySlice, {
  useMenuItemByCategory,
} from './MenuItemByCategory';
import cartSlice, {cartStates} from './cart';
import basketSlice, {basketStates} from './basket';
import planSlice, {planStates} from './planlist';

export {
  authSlice,
  signIn,
  signOut,
  reset,
  setUserDetails,
  filterSlice,
  usePricing,
  useCategory,
  useCombination,
  clearAll,
  useFilter,
  visibilityToggle,
  useMaxPricing,
  useMinPricing,
  networkManagerSlice,
  checkNetwork,
  menuItemSlice,
  getMenuItems,
  menuItemsSpecialOfferlice,
  getSpecialOffer,
  newMenuItemSlice,
  getNewItem,
  popularMenuItemSlice,
  getPopularItem,
  menuItemsForYouSlice,
  getMenuItemsForYou,
  menuItemPlanForYouSlice,
  getMenuItemsPlanForYou,
  glutenMenuItemSlice,
  getGlutenMenuItems,
  drinkMenuItemSlice,
  getDrinkMenuItems,
  breakFastMenuItemSlice,
  getBreakFastMenuItems,
  historyMenuItemslice,
  getMenuItemsHistory,
  menuItemByCategorySlice,
  useMenuItemByCategory,
  cartSlice,
  cartStates,
  menuItemCategorySlice,
  useMenuItemCategory,
  menuPlanCategorySlice,
  useMenuPlanCategory,
  basketSlice,
  basketStates,
  planSlice,
  planStates,
};
