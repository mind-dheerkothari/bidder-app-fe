import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_END_POINT } from "../../utils/apiEndPoints";
import { DELETE, GET, POST } from "../../services/axiosRequestHandler";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../utils/propertyResolver";
import { showToast } from "../../sharedComponents/toast/showTaost";

const userInitialState = {
  isLoading: false,
  error: null,
  loginUserDetails: {},
  userDetailById: {},
};

export const getLoginUserDetail = createAsyncThunk(
  "auction/getLoginUserDetail",
  async (_, thunkApi) => {
    try {
      const response = await GET(API_END_POINT.USER_DETAIL);
      if (response?.status === 200) {
        return response?.response?.data?.data;
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

export const getUserDetailById = createAsyncThunk(
  "auction/getUserDetailById",
  async (userId, thunkApi) => {
    try {
      const response = await GET(
        `${API_END_POINT.GET_USER_DETAIL_BY_ID}/${userId}`
      );
      if (response?.status === 200) {
        return response?.response?.data?.data;
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

export const updateUserDetailById = createAsyncThunk(
  "auction/updateUserDetailById",
  async (payload, thunkApi) => {
    try {
      const response = await POST(
        API_END_POINT.UPDATE_USER_DETAIL_BY_ID,
        payload
      );
      if (response?.status === 200) {
        return response?.response?.data?.data;
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

export const deleteUserById = createAsyncThunk(
  "user/deleteUserById",
  async (id, thunkApi) => {
    try {
      const response = await DELETE(
        `${API_END_POINT.DELETE_USER_BY_ID}/${id}`
      );
      if (response?.status === 200) {
        showToast(
          response?.response?.data?.message ||
            SUCCESS_MESSAGE.DELETE_USER,
          "success"
        );
        return response?.response?.data?.data;
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

export const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLoginUserDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLoginUserDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.loginUserDetails = action.payload;
      })
      .addCase(getLoginUserDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.loginUserDetails = {};
      })
      .addCase(getUserDetailById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserDetailById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userDetailById = action.payload;
      })
      .addCase(getUserDetailById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.userDetailById = {};
      })
      .addCase(updateUserDetailById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserDetailById.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateUserDetailById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
