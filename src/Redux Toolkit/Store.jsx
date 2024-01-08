import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice/authSlice";
import recipeReducer from "./Slice/recipeSlice";
import userReducer from "./Slice/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    recipes: recipeReducer,
  },
});
