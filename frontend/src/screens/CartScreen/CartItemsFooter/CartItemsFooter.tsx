import styles from "./CartItemsFooter.module.css";
import CustomButton from "../../../components/UI/CustomButton/CustomButton";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import paypalIcon from "../../../assets/paypal_logo.svg";

const CartItemsFooter: React.FC<{
  clickHandler: () => void;
  className?: string;
  showAllPrice?: boolean;
}> = ({ clickHandler, showAllPrice, className }) => {
  const cart = useSelector((state: RootState) => state.cartReducer);

  let defaultCartItemClassName = styles["cart-items__price-details-item"];

  const [cartItemClassName, setCartItemClassName] = useState(
    defaultCartItemClassName
  );

  useEffect(() => {
    if (showAllPrice) {
      setCartItemClassName(
        `${styles["cart-items__price-details-item"]} ${styles["shipping"]}`
      );
    }
  }, [showAllPrice]);

  return (
    <div className={`${className ?? ""} ${styles["cart-items__footer"]}`}>
      {showAllPrice && (
        <div className={cartItemClassName}>
          <p>Subtotal</p>

          <p>${cart.itemsPrice}</p>
        </div>
      )}

      <div className={cartItemClassName}>
        <p>Delivery/Shipping</p>
        <p style={cart.shippingPrice === 0 ? { color: "#198754" } : {}}>
          {cart.shippingPrice === 0 ? "Free" : `$${cart.shippingPrice}`}
        </p>
      </div>
      <div className={cartItemClassName}>
        <p>
          Total
          {showAllPrice && (
            <small
              style={{
                display: "block",
                fontSize: "0.75rem",
                fontWeight: "normal",
                color: "rgb(33, 37, 41, 0.6)",
              }}
            >
              Including ${cart.taxPrice} in taxes
            </small>
          )}
        </p>

        <p>${cart.totalPrice}</p>
      </div>

      <CustomButton
        className={showAllPrice ? styles["cart-items__checkout-button"] : ""}
        onClick={clickHandler}
      >
        {showAllPrice ? (
          <p>
            Pay with <img src={paypalIcon} />
          </p>
        ) : (
          "Secure Checkout"
        )}
      </CustomButton>
    </div>
  );
};

export default CartItemsFooter;

// {showAllPrice && (
//   <div className={cartItemClassName}>
//     <p>Duties & Taxes</p>

//     <p>${cart.taxPrice}</p>
//   </div>
// )}

// <div className={cartItemClassName}>
//   <p>Total</p>

//   <p>${cart.totalPrice}</p>
// </div>
