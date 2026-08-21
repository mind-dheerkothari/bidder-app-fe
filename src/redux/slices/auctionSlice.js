import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DELETE, GET, POST, PUT } from "../../services/axiosRequestHandler";
import { API_END_POINT } from "../../utils/apiEndPoints";
import { showToast } from "../../sharedComponents/toast/showTaost";
import {
  ERROR_MESSAGE,
  PAGINATION_CONSTANT,
  SUCCESS_MESSAGE,
} from "../../utils/propertyResolver";

const auctionInitialState = {
  isLoading: false,
  error: null,
  auctionOnHome: [],
  auctionDetail: null,
  auctionCategoryList: [],
  auctionListInfo: {
    totalCount: 0,
    data: [],
    hasMore: false,
  },
  myAuctionList: {
    data: [],
    totalRecord: 0,
  },
};

export const getAuctionListForHome = createAsyncThunk(
  "auction/auctionListForHome",
  async (_, thunkApi) => {
    try {
      const response = await GET(
        `${API_END_POINT.GET_AUCTION_LIST}?page=1&limit=8`
      );
      if (response?.status === 200) {
        return response?.response?.data?.data?.auctions;
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

export const getAuctionDetailById = createAsyncThunk(
  "auction/getAuctionDetailById",
  async (auction_id, thunkApi) => {
    try {
      const response = await GET(
        `${API_END_POINT.GET_AUCTION_DETAIL_BY_ID}/${auction_id}`
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

export const placeBid = createAsyncThunk(
  "auction/placeBid",
  async (payload, thunkApi) => {
    try {
      const response = await POST(API_END_POINT.BID_APPLY, payload);
      if (response?.status === 200) {
        showToast(
          response?.response?.data?.message || SUCCESS_MESSAGE.BID_PLACE
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

export const getAuctionCategoryLIst = createAsyncThunk(
  "auction/getAuctionCategoryLIst",
  async (_, thunkApi) => {
    try {
      const response = await GET(API_END_POINT.GET_AUCTION_CATEGORY_LIST);
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

export const createAuction = createAsyncThunk(
  "auction/createAuction",
  async (payload, thunkApi) => {
    try {
      const response = await POST(API_END_POINT.CREATE_AUCTION, payload);
      if (response?.status === 200) {
        showToast(
          response?.response?.data?.message || SUCCESS_MESSAGE.CREATED_AUCTION,
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

export const getAuctionList = createAsyncThunk(
  "auction/getAuctionList",
  async (payload, thunkApi) => {
    try {
      // Build Query parameter dynamically
      const queryParams = new URLSearchParams({
        page: payload.page,
        limit: payload.limit,
        sortBy: payload.sortBy,
      });

      if (payload.minPrice) {
        queryParams.append("minPrice", payload.minPrice);
      }
      if (payload.maxPrice) {
        queryParams.append("maxPrice", payload.maxPrice);
      }
      if (payload.categoryId) {
        queryParams.append("categoryId", payload.categoryId);
      }

      const response = await GET(
        `${API_END_POINT.GET_AUCTION_LIST}?${queryParams.toString()}`
      );
      if (response?.status === 200) {
        // Getting api response
        const totalCount =
          response?.response?.data?.data?.pagination?.total || 0;
        const newData = response?.response?.data?.data?.auctions || [];

        // Getting current data and page
        const state = thunkApi.getState();
        const currentPage = payload?.page || 1;
        const currentData = state?.auction?.auctionListInfo?.data || [];

        const moreCount =
          currentPage === PAGINATION_CONSTANT.PAGE_ONE
            ? [...newData]?.length
            : [...currentData, ...newData]?.length;

        return {
          totalCount: totalCount,
          data:
            currentPage === PAGINATION_CONSTANT.PAGE_ONE
              ? [...newData]
              : [...currentData, ...newData],
          hasMore: moreCount < totalCount,
        };
      } else {
        return thunkApi.rejectWithValue(
          response?.response?.data?.message ||
            ERROR_MESSAGE.SOMETHING_WENT_WRONG
        );
      }
    } catch (error) {
      if (error?.response?.status !== 404) {
        showToast(error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG, "error");
      }
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getMyAuctionList = createAsyncThunk(
  "auction/getMyAuctionList",
  async (payload, thunkApi) => {
    try {
      const response = await POST(
        `${API_END_POINT.MY_AUCTION_LIST}`, payload
      );
      if (response?.status === 200) {
        return {
          data: response?.response?.data?.data?.auctions || [],
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

export const updateAuction = createAsyncThunk(
  "auction/updateAuction",
  async (payload, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const auctionId = state?.auction?.auctionDetail?.id;
      const response = await PUT(
        `${API_END_POINT.UPDATE_AUCTION}/${auctionId}`,
        payload
      );
      if (response?.status === 200) {
        showToast(
          response?.response?.data?.message || SUCCESS_MESSAGE.UPDATED_AUCTION,
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

export const deleteAuction = createAsyncThunk(
  "auction/deleteAuction",
  async (auctionId, thunkApi) => {
    try {
      const response = await DELETE(
        `${API_END_POINT.DELETE_AUCTION}/${auctionId}`
      );
      if (response?.status === 200) {
        showToast(
          response?.response?.data?.message || SUCCESS_MESSAGE.DELETED_AUCTION,
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

export const auctionSlice = createSlice({
  name: "auction",
  initialState: auctionInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAuctionListForHome.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAuctionListForHome.fulfilled, (state, action) => {
        state.isLoading = false;
        state.auctionOnHome = action.payload || [];
      })
      .addCase(getAuctionListForHome.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.auctionOnHome = [];
      })
      .addCase(getAuctionDetailById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAuctionDetailById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.auctionDetail = action.payload;
      })
      .addCase(getAuctionDetailById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.auctionDetail = null;
      })
      .addCase(placeBid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(placeBid.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(placeBid.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAuctionCategoryLIst.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAuctionCategoryLIst.fulfilled, (state, action) => {
        state.isLoading = false;
        state.auctionCategoryList = action.payload;
      })
      .addCase(getAuctionCategoryLIst.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.auctionCategoryList = [];
      })
      .addCase(createAuction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAuction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createAuction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAuctionList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAuctionList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.auctionListInfo = action.payload;
      })
      .addCase(getAuctionList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.auctionListInfo = {
          totalCount: 0,
          data: [],
          hasMore: false,
        };
      })
      .addCase(getMyAuctionList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyAuctionList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myAuctionList = action.payload;
      })
      .addCase(getMyAuctionList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.myAuctionList = {
          data: [],
          totalRecord: 0,
        };
      })
      .addCase(updateAuction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAuction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateAuction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteAuction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAuction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteAuction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default auctionSlice.reducer;
