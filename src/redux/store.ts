import { configureStore } from "@reduxjs/toolkit";
import appointmentReducer from "./slices/appointment-slice";
import cartReducer from "./slices/cart-slice";
import doctorFilterReducer from "./slices/doctor-filter-slice";
import filterReducer from "./slices/filter-slice";
import languageReducer from "./slices/language-slice";
import productFilterReducer from "./slices/product-filter-slice";
import refreshReducer from "./slices/refresh-slice";
import serviceFilterReducer from "./slices/service-filter-slice";
import userReducer from "./slices/user-slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    language: languageReducer,
    cart: cartReducer,
    appointment: appointmentReducer,
    filter: filterReducer,
    filter_doctor: doctorFilterReducer,
    service_filter: serviceFilterReducer,
    product_filter: productFilterReducer,
    refresh: refreshReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
