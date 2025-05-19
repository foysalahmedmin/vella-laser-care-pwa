/*
 * Copyright (c) 2023-2024. Project developed by Rashaduzamman Rian
 */

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface RefreshState {
  order: number;
  order_total: number;
  booking: number;
  booking_total: number;
  appointment: number;
  appointment_total: number;
}

const initialState: RefreshState = {
  order: 1,
  order_total: 0,
  booking: 1,
  booking_total: 0,
  appointment: 1,
  appointment_total: 0,
};

export const refreshSlice = createSlice({
  name: "refresh",
  initialState,
  reducers: {
    SetOrderPage: (state, action: PayloadAction<number>) => {
      state.order = action.payload;
    },
    SetBookingPage: (state, action: PayloadAction<number>) => {
      state.booking = action.payload;
    },
    SetAppointmentPage: (state, action: PayloadAction<number>) => {
      state.appointment = action.payload;
    },
    SetOrderTotal: (state, action: PayloadAction<number>) => {
      state.order_total = action.payload;
    },
    SetBookingTotal: (state, action: PayloadAction<number>) => {
      state.booking_total = action.payload;
    },
    SetAppointmentTotal: (state, action: PayloadAction<number>) => {
      state.appointment_total = action.payload;
    },
  },
});

export const {
  SetOrderPage,
  SetBookingPage,
  SetAppointmentPage,
  SetOrderTotal,
  SetBookingTotal,
  SetAppointmentTotal,
} = refreshSlice.actions;

export default refreshSlice.reducer;
