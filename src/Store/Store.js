import { configureStore } from "@reduxjs/toolkit";
import foodsReducer from "../Reducers/foodsSlice/foodsSlice";
import userReducer from "../Reducers/userSlice/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    foods: foodsReducer,
  },
});
