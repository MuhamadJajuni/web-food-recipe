import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice/authSlice";
import userReducer from "./Slice/userSlice";
import recipeReducer from "./Slice/recipeSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    recipes: recipeReducer
  },
});
