import { CartType } from "../store/cartSlice";

export const calculateTotalPrice = (state: CartType) => {
  //Resetting & Adding the total items price
  state.itemsPrice = 0;

  //Resetting the total Quantity to calculate
  let totalQty = 0;

  state.items.forEach((item) => {
    state.itemsPrice += item.product.price * item.quantity;

    totalQty += item.quantity;
  });

  //Adding total Quantity
  state.totalQuantity = totalQty;

  //Adding Shipping Charges  ///Total price below $10 will pay shipping price
  state.shippingPrice = state.itemsPrice > 100 ? 0 : 10;

  //Adding 15% tax
  state.taxPrice = Number((state.itemsPrice * 0.15).toFixed(2));

  //Calculating the total price and keeping till 2 decimals
  const calculatedTotalPrice =
    state.itemsPrice + state.shippingPrice + state.taxPrice;

  state.totalPrice = Number(calculatedTotalPrice.toFixed(2));

  //Storing the cart in the local storage
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
