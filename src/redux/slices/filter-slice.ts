import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface FilterState {
  department: string;
  search: string;
  department_search: string;
}

const initialState: FilterState = {
  department: "",
  search: "",
  department_search: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    SetFilterSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    SetFilterDepartment: (state, action: PayloadAction<string>) => {
      state.department = action.payload;
    },
    SetFilterDepartmentSearch: (state, action: PayloadAction<string>) => {
      state.department_search = action.payload;
    },
    ResetDoctorFilter: (state) => {
      state.department_search = "";
      state.department = "";
      state.search = "";
    },
  },
});

export const {
  SetFilterSearch,
  SetFilterDepartment,
  SetFilterDepartmentSearch,
  ResetDoctorFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
