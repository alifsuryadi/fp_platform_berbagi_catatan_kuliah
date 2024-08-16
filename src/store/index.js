import { combineReducers } from "redux";
import { authReducer } from "./auth";

export const reducers = combineReducers({
  authenticated: authReducer,
});
