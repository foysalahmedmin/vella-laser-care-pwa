import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface ServiceFilterState {
  search: string;
  category: string;
  category_search: string;
  service_type: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  slot: string;
  message: string;
  payment_method: string;
}

const initialState: ServiceFilterState = {
  search: "",
  category: "",
  category_search: "",
  service_type: "",
  name: "",
  email: "",
  phone: "",
  date: "",
  slot: "",
  message: "",
  payment_method: "",
};

export const serviceFilterSlice = createSlice({
  name: "service_filter",
  initialState,
  reducers: {
    SetFilterSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    SetFilterCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    SetFilterCategorySearch: (state, action: PayloadAction<string>) => {
      state.category_search = action.payload;
    },
    SetFilterServiceType: (state, action: PayloadAction<string>) => {
      state.service_type = action.payload;
    },
    SetFilterName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    SetFilterEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    SetFilterPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    SetFilterDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    SetFilterSlot: (state, action: PayloadAction<string>) => {
      state.slot = action.payload;
    },
    SetFilterMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    SetFilterPaymentMethod: (state, action: PayloadAction<string>) => {
      state.payment_method = action.payload;
    },
    ResetServiceFilter: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  SetFilterSearch,
  SetFilterCategory,
  SetFilterCategorySearch,
  SetFilterServiceType,
  SetFilterName,
  SetFilterEmail,
  SetFilterPhone,
  SetFilterDate,
  SetFilterSlot,
  SetFilterMessage,
  SetFilterPaymentMethod,
  ResetServiceFilter,
} = serviceFilterSlice.actions;

export default serviceFilterSlice.reducer;
