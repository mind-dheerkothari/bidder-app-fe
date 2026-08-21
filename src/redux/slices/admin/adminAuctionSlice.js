import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { POST } from "../../../services/axiosRequestHandler";
import {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from "../../../utils/propertyResolver";
import { showToast } from "../../../sharedComponents/toast/showTaost";
import { API_END_POINT } from "../../../utils/apiEndPoints";

const adminAuctionInitialState = {
  isLoading: false,
  error: null,
  auctionList: {
    data: [],
    totalRecord: 0,
  },
};

export const getAdminAuctionList = createAsyncThunk(
  "auction/getAdminAuctionList",
  async (payload, thunkApi) => {
    try {
      const response = await POST(API_END_POINT.ADMIN_AUCTION_LIST, payload);
      if (response?.status === 200) {
        return {
          data: response?.response?.data?.data?.auctions || [],
          totalRecord: response?.response?.data?.data?.pagination?.total,
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

export const updateAuctionStatus = createAsyncThunk(
  "auction/updateAuctionStatus",
  async (payload, thunkApi) => {
    try {
      const response = await POST(API_END_POINT.UPDATE_AUCTION_STATUS, payload);
      if (response?.status === 200) {
        showToast(SUCCESS_MESSAGE.UPDATED_AUCTION, "success");
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

export const adminAuctionSlice = createSlice({
  name: "adminAuction",
  initialState: adminAuctionInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminAuctionList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdminAuctionList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.auctionList = action.payload;
      })
      .addCase(getAdminAuctionList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.auctionList = {
          data: [],
          totalRecord: 0,
        };
      })
      .addCase(updateAuctionStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAuctionStatus.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateAuctionStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default adminAuctionSlice.reducer;
