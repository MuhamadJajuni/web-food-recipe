import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducers from "../Reducer/index"; // Correct import statement

const middleware = [...getDefaultMiddleware(), thunk, logger];

const store = configureStore({
  reducer: rootReducers,
  middleware,
});

export default store;
