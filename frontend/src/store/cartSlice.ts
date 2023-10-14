import { createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../utils/customTypes";
import { calculateTotalPrice } from "../utils/cartUtils";

type CartItemType = {
  product: ProductType;
  quantity: number;
};

type CartType = {
  items: CartItemType[];
  totalQuantity: number;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
};

const initialCart: CartType = {
  items: [],
  totalQuantity: 0,
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
};

const initialState: CartType = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart") ?? "")
  : initialCart;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: { payload: CartItemType }) {
      const receivedItem = action.payload;

      const isItem = state.items.find(
        (item) => item.product._id === receivedItem.product._id
      );

      //If item is not there then added to the list else increased the quantity
      if (!isItem) {
        state.items = [...state.items, receivedItem];
      } else {
        state.items = state.items.map((item) => {
          if (item.product._id === receivedItem.product._id) {
            item.quantity = receivedItem.quantity;
          }

          return item;
        });
      }

      return calculateTotalPrice(state);
    },
    removeFromCart(state, action: { payload: CartItemType }) {
      const receivedItem = action.payload;

      //Removing item if the quantity is zero

      state.items = state.items.filter(
        (item) => item.product._id !== receivedItem.product._id
      );
      return calculateTotalPrice(state);
    },
    deleteCart() {
      //Deleting cart from localStorage
      localStorage.removeItem("cart");
      return initialCart;
    },
  },
});

const cartAction = cartSlice.actions;

export { cartAction };

export type { CartItemType, CartType };

export default cartSlice.reducer;
