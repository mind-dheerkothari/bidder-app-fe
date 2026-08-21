import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { POST } from "../../../services/axiosRequestHandler";
import { ERROR_MESSAGE } from "../../../utils/propertyResolver";
import { showToast } from "../../../sharedComponents/toast/showTaost";
import { API_END_POINT } from "../../../utils/apiEndPoints";

const adminUserInitialState = {
  isLoading: false,
  error: null,
  userList: {
    data: [],
    totalRecord: 0,
  },
};

export const getAdminUserList = createAsyncThunk(
  "user/getAdminUserList",
  async (payload, thunkApi) => {
    try {
      const response = await POST(API_END_POINT.ADMIN_USER_LIST, payload);
      if (response?.status === 200) {
        return {
          data: response?.response?.data?.data?.rows || [],
          totalRecord: response?.response?.data?.data?.pagination?.total || 0,
        };
      } else {
        showToast(
          response?.response?.data?.message ||
            ERROR_MESSAGE.SOMETHING_WENT_WRONG,
          "error"
        );
        return thunkApi.rejectWithValue(
          response?.response?.data?.message ||
            ERROR_MESSAGE.SOMETHING_WENT_WRONG
        );
      }
    } catch (error) {
      showToast(error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG, "error");
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const adminUserSlice = createSlice({
  name: "adminUser",
  initialState: adminUserInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminUserList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdminUserList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userList = action.payload;
      })
      .addCase(getAdminUserList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.userList = {
          data: [],
          totalRecord: 0,
        };
      });
  },
});

export default adminUserSlice.reducer;
