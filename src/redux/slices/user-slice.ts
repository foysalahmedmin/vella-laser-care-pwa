import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  accessToken?: string;
  refreshToken?: string;
  role?: string;
  isAuthenticated?: boolean;
  [key: string]: unknown;
}

const getInitialUser = (): User => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : { isAuthenticated: false };
  } catch (error) {
    console.error("Error parsing user from localStorage", error);
    return { isAuthenticated: false };
  }
};

const initialState: User = getInitialUser();

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      const user = action.payload;
      if (user?.accessToken) {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, isAuthenticated: true })
        );
        return { ...user, isAuthenticated: true };
      }
      return state;
    },
    clearUser: () => {
      localStorage.removeItem("user");
      return { isAuthenticated: false };
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
