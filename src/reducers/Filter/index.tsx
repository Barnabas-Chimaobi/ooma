import {createSlice} from '@reduxjs/toolkit';

export interface authState {
  category: string;
  combination: string;
  price: string;
  category1: string;
  combination1: string;
  price1: string;
  visible: boolean;
  maxPrice: number;
  minPrice: number;
}

const initialState: authState = {
  category: '',
  combination: '',
  price: '',
  category1: '',
  combination1: '',
  price1: '',
  visible: false,
  maxPrice: 0,
  minPrice: 0,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    usePricing: (state: any, action) => {
      state.price = action.payload;
    },

    useMaxPricing: (state: any, action) => {
      state.maxPrice = action.payload;
      // console.log(state.maxPrice);
    },
    useMinPricing: (state: any, action) => {
      state.minPrice = action.payload;
      // console.log(state.minPrice);
    },
    useCategory: (state: any, action) => {
      state.category = action.payload;
    },
    useCombination: (state: any, action) => {
      // console.log(action.payload);
      state.combination = action.payload;
    },
    useFilter: (state: any, {payload}) => {
      // console.log(payload);
      state.category1 = payload.category || state.category;
      state.combination1 = payload.combination || state.combination;
      state.price1 = payload.price || state.price;
    },
    clearAll: (state: any) => {
      (state.maxPrice = 0), (state.minPrice = 0), (state.category = '');
      state.combination = '';
    },
    visibilityToggle: (state: any) => {
      state.visible = !state.visible;
    },
  },
});

export const {
  actions: {
    usePricing,
    useCategory,
    useCombination,
    clearAll,
    visibilityToggle,
    useFilter,
    useMaxPricing,
    useMinPricing,
  },
} = filterSlice;

export default filterSlice.reducer;
