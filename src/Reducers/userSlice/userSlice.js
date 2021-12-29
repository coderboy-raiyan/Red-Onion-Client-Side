import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    error: "",
    loading: true,
  },

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, setError, setLoading } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectError = (state) => state.user.error;
export const selectLoading = (state) => state.user.loading;
export default userSlice.reducer;
