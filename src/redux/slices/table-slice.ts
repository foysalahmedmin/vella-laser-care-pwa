import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface TableState {
  page: number;
  limit: number;
  search: string;
  total: number;
  sort: number;
}

const initialState: TableState = {
  page: 1,
  limit: 10,
  search: "",
  total: 0,
  sort: -1,
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    SetSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    SetPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    SetLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    SetTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    SetSort: (state, action: PayloadAction<number>) => {
      state.sort = action.payload;
    },
  },
});

export const { SetSearch, SetPage, SetLimit, SetTotal, SetSort } =
  tableSlice.actions;

export default tableSlice.reducer;
