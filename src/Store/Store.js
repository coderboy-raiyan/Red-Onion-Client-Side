import { configureStore } from "@reduxjs/toolkit";
import foodsReducer from "../Reducers/foodsSlice/foodsSlice";

export const store = configureStore({
  reducer: {
    foods: foodsReducer,
  },
});
