import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartReducerInitialState } from "../../types/reducer-types";
import { CartItem, ShippingInfo } from "../../types/types";
const initialState: CartReducerInitialState = {
  loading: false,
  cartItems: [],
  subtotal: 0,
  tax: 0,
  shippingCharges: 0,
  discount: 0,
  total: 0,
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  },
};
export const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.loading = true;

      const index = state.cartItems.findIndex(
        (i) => i.productId === action.payload.productId
      );

      if (index !== -1)
        state.cartItems[index].quantity =
          state.cartItems[index].quantity + action.payload.quantity;
      else state.cartItems.push(action.payload);

      state.loading = false;
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      state.loading = true;
      const index = state.cartItems.findIndex(
        (i) => i.productId === action.payload
      );
      if (state.cartItems[index].quantity >= state.cartItems[index].stock)
        return;
      state.cartItems[index].quantity = state.cartItems[index].quantity + 1;
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      state.loading = true;
      const index = state.cartItems.findIndex(
        (i) => i.productId === action.payload
      );
      if (state.cartItems[index].quantity >= 2) {
        state.cartItems[index].quantity = state.cartItems[index].quantity - 1;
      }
    },
    removeCartItem: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.cartItems = state.cartItems.filter(
        (i) => i.productId !== action.payload
      );
      state.loading = false;
    },
    calculatePrice: (state) => {
      state.loading = true;
      const subtotal = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      state.subtotal = subtotal;

      state.shippingCharges = subtotal > 0 && state.subtotal < 1000 ? 60 : 0;
      // state.shippingCharges = subtotal < 0 && state.subtotal > 1000 ? 0 : 60;
      state.tax = Math.round(state.subtotal * 0.05);
      state.total =
        state.subtotal +
        state.tax +
        state.shippingCharges -
        (state.discount / 100) * subtotal;
      state.loading = false;
    },
    discountApplied: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
    },
    removeDiscount: (state) => {
      state.discount = 0;
    },
    saveShippingInfo: (state, action: PayloadAction<ShippingInfo>) => {
      state.shippingInfo = action.payload;
    },
    resetCart: () => initialState,
  },
});

export const {
  addToCart,
  removeCartItem,
  decrementQuantity,
  incrementQuantity,
  calculatePrice,
  discountApplied,
  saveShippingInfo,
  resetCart,
  removeDiscount,
} = cartReducer.actions;
