import { configureStore } from "@reduxjs/toolkit";
import foodReducer from "../Reducers/AddCartSlice/AddCartSlice";
import foodsReducer from "../Reducers/foodsSlice/foodsSlice";

export const store = configureStore({
  reducer: {
    foods: foodsReducer,
    food: foodReducer,
  },
});
