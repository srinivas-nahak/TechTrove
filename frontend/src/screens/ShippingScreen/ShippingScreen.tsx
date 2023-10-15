import { FormEventHandler, useEffect, useRef } from "react";
import CustomInputGroup from "../../components/CustomInputGroup/CustomInputGroup";
import userFormValidator from "../../hooks/userFormValidator";
import styles from "./ShippingScreen.module.css";
import CartItemsBody from "../CartScreen/CartItemsBody/CartItemsBody";
import { useNavigate } from "react-router-dom";
import CartItemsFooter from "../CartScreen/CartItemsFooter/CartItemsFooter";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { usePlaceOrderMutation } from "../../store/apiSlices/orderApiSlice";
import { OrderType } from "../../utils/customTypes.js";
import { btnLoaderAction } from "../../store/buttonLoaderSlice.js";
import CustomModalDialog from "../../components/CustomModalDialog/CustomModalDialog.js";
import { cartAction } from "../../store/cartSlice.js";

const ShippingScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.authReducer);
  const cart = useSelector((state: RootState) => state.cartReducer);
  const [placeOrder, { isSuccess }] = usePlaceOrderMutation();
  const animationContainer = useRef<HTMLDivElement | null>(null);

  const navigateHandler = (path: string) => {
    //Deleting the existing cart before navigation
    if (localStorage.getItem("cart")) {
      dispatch(cartAction.deleteCart());
    }

    navigate(path);
    navigate(0);

    //Disabling back button on the next screen
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      //window.history.pushState(null, "", window.location.href);
      window.history.go(1);
    };
  };

  //Checking if the cart is empty then showing errorMessage
  //It's happening due to back button of home screen
  useEffect(() => {
    if (cart.items && cart.items.length === 0) {
      navigateHandler("/");
    }
  }, []);

  //Using custom hooks for Input Field states
  const { enteredValue: inputAddress, valueInputHandler: addressInputHandler } =
    userFormValidator();

  const { enteredValue: inputCity, valueInputHandler: cityInputHandler } =
    userFormValidator();

  const {
    enteredValue: inputPostalCode,
    valueInputHandler: postalCodeInputHandler,
  } = userFormValidator();

  const { enteredValue: inputCountry, valueInputHandler: countryInputHandler } =
    userFormValidator();

  const shippingSubmitHandler: FormEventHandler = (event) => {
    event.preventDefault();
  };

  const abortShippingHandler = () => {
    navigate("/");
  };

  const orderPlaceHandler = async () => {
    if (
      inputAddress.length === 0 ||
      inputCity.length === 0 ||
      inputPostalCode.length === 0 ||
      inputCountry.length === 0
    ) {
      return;
    }

    const { itemsPrice, taxPrice, shippingPrice, totalPrice } = cart;

    const orderedItems = cart.items.map((item) => {
      const qty = item.quantity;
      const { _id: productId, name, image, price } = item.product;

      return { productId, name, qty, image, price };
    });

    const order: OrderType = {
      user: userInfo._id!,
      orderedItems,
      shippingAddress: {
        address: inputAddress,
        city: inputCity,
        postalCode: Number(inputPostalCode),
        country: inputCountry,
      },
      paymentMethod: "paypal",
      paymentResult: {
        id: Math.random().toString(),
        status: "done",
        update_time: Date.now().toString(),
        email_address: userInfo.email!,
      },
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid: true,
      paidAt: undefined,
      isDelivered: false,
      deliveredAt: undefined,
    };

    dispatch(
      btnLoaderAction.addProperty({ loaderColor: "#212529", showLoader: true })
    );

    const res = await placeOrder(order);

    //On Success
    if (!("error" in res)) {
      dispatch(btnLoaderAction.addProperty({ showLoader: false }));
    }
  };

  return (
    <>
      {isSuccess && (
        <CustomModalDialog
          message="Order has been placed successfully!"
          btnText="Go to Orders"
          clickHandler={() => navigateHandler("/orders")}
          btnAnimationEndHandler={() => navigateHandler("/")}
        />
      )}

      <div className="animationContainer" ref={animationContainer} />
      <div className={styles["shipping-screen-container"]}>
        <div className={styles["shipping-form"]}>
          <h1>Shipping</h1>
          <form onSubmit={shippingSubmitHandler}>
            <CustomInputGroup
              label="Address"
              id="address-shipping"
              name="address-shipping"
              type="text"
              placeholder="Your address"
              value={inputAddress}
              required
              onChange={addressInputHandler}
            />
            <CustomInputGroup
              label="City"
              id="city-shipping"
              name="city-shipping"
              type="text"
              placeholder="Your city"
              value={inputCity}
              required
              onChange={cityInputHandler}
            />
            <CustomInputGroup
              label="Postal Code"
              id="postal-code-shipping"
              name="postal-code-shipping"
              type="number"
              placeholder="Your zip code"
              value={inputPostalCode}
              required
              onChange={postalCodeInputHandler}
            />
            <CustomInputGroup
              label="Country"
              id="country-shipping"
              name="country-shipping"
              type="text"
              placeholder="Your country"
              value={inputCountry}
              required
              onChange={countryInputHandler}
            />
            {/* <CustomButton type="submit">Pay & Checkout</CustomButton> */}
          </form>
        </div>
        <div className={styles["shipping-order-summary"]}>
          <h1>Order Summary</h1>
          <CartItemsFooter
            clickHandler={orderPlaceHandler}
            className={styles["shipping-order-summary__price"]}
            showAllPrice={true}
          />
          <p
            className={styles["shipping-order-summary__item-title"]}
          >{`Selected Products(${cart.totalQuantity})`}</p>
          <CartItemsBody
            closeClickHandler={abortShippingHandler}
            className={styles["shipping-order-summary__items"]}
          />
        </div>
      </div>
    </>
  );
};

export default ShippingScreen;
