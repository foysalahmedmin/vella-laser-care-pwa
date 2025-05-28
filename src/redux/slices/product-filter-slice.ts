import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface ProductFilterState {
  search: string;
  category: string;
  sub_category: string;
  min_price: number;
  max_price: number;
  skin_type: string;
  skin_concern: string;
}

const initialState: ProductFilterState = {
  search: "",
  category: "",
  sub_category: "",
  min_price: 0,
  max_price: 0,
  skin_type: "",
  skin_concern: "",
};

export const productFilterSlice = createSlice({
  name: "product_filter",
  initialState,
  reducers: {
    SetFilterSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    SetFilterCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    SetFilterSubCategory: (state, action: PayloadAction<string>) => {
      state.sub_category = action.payload;
    },
    SetFilterMinPrice: (state, action: PayloadAction<number>) => {
      state.min_price = action.payload;
    },
    SetFilterMaxPrice: (state, action: PayloadAction<number>) => {
      state.max_price = action.payload;
    },
    SetFilterSkinConcern: (state, action: PayloadAction<string>) => {
      state.skin_concern = action.payload;
    },
    SetFilterSkinType: (state, action: PayloadAction<string>) => {
      state.skin_type = action.payload;
    },
  },
});

export const {
  SetFilterSearch,
  SetFilterMaxPrice,
  SetFilterMinPrice,
  SetFilterSkinConcern,
  SetFilterSubCategory,
  SetFilterSkinType,
  SetFilterCategory,
} = productFilterSlice.actions;

export default productFilterSlice.reducer;
