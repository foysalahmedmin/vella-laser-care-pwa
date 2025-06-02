import type { CartProduct } from "@/types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface CartState {
  isOpen: boolean;
  products: CartProduct[];
  email: string;
  name: string;
  city: string;
  address: string;
  postal: string;
  phone: string;
  as_profile: boolean;
  payment_method: string;
}

const initialState: CartState = {
  isOpen: false,
  products: [],
  email: "",
  name: "",
  city: "",
  address: "",
  postal: "",
  phone: "",
  as_profile: false,
  payment_method: "online",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ToggleCartIsOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
    SetCartProduct: (state, action: PayloadAction<CartProduct>) => {
      state.products = state.products.filter(
        (x) => x?._id !== action.payload?._id,
      );
      state.products.push(action.payload);
    },
    SetCartProductQuantity: (state, action: PayloadAction<CartProduct[]>) => {
      state.products = action.payload;
    },
    SetCartProductRemove: (state, action: PayloadAction<CartProduct>) => {
      state.products = state.products.filter(
        (x) => x?._id !== action.payload?._id,
      );
    },
    SetCartEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    SetCartName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    SetCartCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    SetCartAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    SetCartPostal: (state, action: PayloadAction<string>) => {
      state.postal = action.payload;
    },
    SetCartPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    SetCartPaymentMethod: (state, action: PayloadAction<string>) => {
      state.payment_method = action.payload;
    },
    ToggleAsProfile: (state) => {
      state.as_profile = !state.as_profile;
    },
    SetResetCart: (state) => {
      state.isOpen = false;
      state.products = [];
      state.email = "";
      state.name = "";
      state.city = "";
      state.address = "";
      state.postal = "";
      state.phone = "";
      state.as_profile = false;
      state.payment_method = "";
    },
  },
});

export const {
  ToggleCartIsOpen,
  SetCartProduct,
  SetCartProductQuantity,
  SetCartProductRemove,
  SetCartAddress,
  SetCartEmail,
  SetCartName,
  SetCartCity,
  SetCartPhone,
  SetCartPostal,
  SetCartPaymentMethod,
  ToggleAsProfile,
  SetResetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
