import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./api/userAPI";
import { userReducer } from "./reducer/userReducer";
import { productAPI } from "./api/productAPI";
import { appFilterReducer } from "./reducer/AppfiltersReducer";
import { cartReducer } from "./reducer/CartReducer";
import { orderApi } from "./api/orderAPI";
import { dashboardApi } from "./api/dashboardApi";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [userReducer.name]: userReducer.reducer,
    [appFilterReducer.name]: appFilterReducer.reducer,
    [cartReducer.name]: cartReducer.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userAPI.middleware)
      .concat(productAPI.middleware)
      .concat(orderApi.middleware)
      .concat(dashboardApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
