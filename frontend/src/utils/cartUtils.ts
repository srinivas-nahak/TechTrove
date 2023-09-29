import { CartType } from "../store/cartSlice";

export const calculateTotalPrice = (state: CartType) => {
  //Resetting & Adding the total items price
  state.itemsPrice = 0;

  state.items.forEach((item) => {
    state.itemsPrice += item.product.price * item.quantity;
  });

  //Adding Shipping Charges  ///Total price below $10 will pay shipping price
  state.shippingPrice = state.itemsPrice > 100 ? 0 : 10;

  //Adding 15% tax
  state.taxPrice = state.itemsPrice * 0.15;

  //Calculating the total price and keeping till 2 decimals
  const calculatedTotalPrice =
    state.itemsPrice + state.shippingPrice + state.taxPrice;

  state.totalPrice = Number(calculatedTotalPrice.toFixed(2));

  //Storing the cart in the local storage
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};