import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import myProductReducer from "./MyRecipesReducer";
import productReducer from "./ProductReducer";

const rootReducers = combineReducers({
  authReducer,
  productReducer,
  myProductReducer,
});

export default rootReducers;
