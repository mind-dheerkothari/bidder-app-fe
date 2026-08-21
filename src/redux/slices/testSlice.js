import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const testInitialState = {
  data: [],
  isLoading: false,
  error: null,
};

//Async thunk for API Call
export const fetchTestData = createAsyncThunk(
  "test/fetchTestData",
  async (_, thunkApi) => {
    // api calling logic
    try {
      const response = await axios.get("https://dummyjson.com/posts");
      if (response.status === 200) {
        return response.data;
      } else {
        return thunkApi.rejectWithValue(response.error);
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const testSlice = createSlice({
  name: "test",
  initialState: testInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTestData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchTestData.rejected, (state, action) => {
        state.data =[];
        state.isLoading = false;
        state.error = action.payload
      });
  },
});

export default testSlice.reducer;
