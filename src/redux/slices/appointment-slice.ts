import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface AppointmentState {
  name: string;
  appointment_type: string;
  department: string;
  email: string;
  phone: string;
  date: string;
  slot: string;
  message: string;
}

const initialState: AppointmentState = {
  name: "",
  appointment_type: "",
  department: "",
  email: "",
  phone: "",
  date: "",
  slot: "",
  message: "",
};

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    SetName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    SetAppointmentType: (state, action: PayloadAction<string>) => {
      state.appointment_type = action.payload;
    },
    SetDepartment: (state, action: PayloadAction<string>) => {
      state.department = action.payload;
    },
    SetPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    SetEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    SetDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    SetSlot: (state, action: PayloadAction<string>) => {
      state.slot = action.payload;
    },
    SetMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    ResetAppointment: (state) => {
      state.name = "";
      state.appointment_type = "";
      state.department = "";
      state.email = "";
      state.phone = "";
      state.date = "";
      state.slot = "";
      state.message = "";
    },
  },
});

export const {
  SetDate,
  SetMessage,
  SetName,
  SetSlot,
  SetDepartment,
  SetPhone,
  SetEmail,
  SetAppointmentType,
  ResetAppointment,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
