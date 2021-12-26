import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchFood = createAsyncThunk("food/fetchFood", async (foodId) => {
  const response = await fetch(`http://localhost:5000/foods/${foodId}`).then(
    (res) => res.json()
  );
  return response;
});

export const AddCartSlice = createSlice({
  name: "AddCart",
  initialState: {
    food: {},
  },

  reducers: {
    setFood: (state, action) => {
      state.food = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchFood.fulfilled, (state, action) => {
      // Add user to the state array
      state.food = action.payload;
    });
  },
});

export const { setFood } = AddCartSlice.actions;
export const selectFood = (state) => state.food.food;
export default AddCartSlice.reducer;
