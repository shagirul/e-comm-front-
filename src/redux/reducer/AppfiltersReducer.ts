import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppFilterInitialState } from "../../types/reducer-types";

const initialState: AppFilterInitialState = {
  search: "",
  page: 1,
  category: "",
  sort: "",
  maxPrice: 25000,
};
export const appFilterReducer = createSlice({
  name: "appFilterReducer",
  initialState: initialState,
  reducers: {
    updateSearchQuery: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.category = "";
    },
    updatePageNo: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    updateCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
      state.search = "";
    },
    updateSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
    updateMaxPrice: (state, action: PayloadAction<number>) => {
      state.maxPrice = action.payload;
    },
    clearFilterState: (state) => {
      state.search = "";
      state.page = 1;
      state.category = "";
      state.sort = "";
      state.maxPrice = 100000;
    },
  },
});
