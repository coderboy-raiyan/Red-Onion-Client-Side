import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// First, create the thunk
export const fetchFoods = createAsyncThunk("foods/fetchFoods", async () => {
  const response = await fetch("http://localhost:5000/foods").then((res) =>
    res.json()
  );
  return response;
});

export const foodSlice = createSlice({
  name: "foods",
  initialState: {
    foods: [],
    foodLoading: true,
  },

  reducers: {
    setFoodLoading: (state, action) => {
      state.foodLoading = action.payload.foodLoading;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchFoods.fulfilled, (state, action) => {
      // Add user to the state array
      state.foods = action.payload;
    });
  },
});

export const { setFoods, setFoodLoading } = foodSlice.actions;
export const selectFoods = (state) => state.foods.foods;
export default foodSlice.reducer;
