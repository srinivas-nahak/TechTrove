import { useDispatch, useSelector } from "react-redux";
import styles from "./CartScreen.module.css";
import { RootState } from "../../store";
import { FaTimes } from "react-icons/fa";
import { cartScreenAction } from "../../store/cartScreenSlice";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartItemsBody from "./CartItemsBody/CartItemsBody";
import CartItemsFooter from "./CartItemsFooter/CartItemsFooter";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cartAnimationClass, setCartAnimationClass] = useState(
    "cart-open-animation"
  );
  const cart = useSelector((state: RootState) => state.cartReducer);
  const cartRef = useRef<HTMLDivElement | null>(null);

  const closeClickHandler = () => {
    setCartAnimationClass("cart-close-animation");

    setTimeout(() => {
      dispatch(cartScreenAction.toggleCartScreen(false));
    }, 500);
  };

  const checkoutClickHandler = () => {
    closeClickHandler();

    //Delaying navigation for better UX
    setTimeout(() => {
      navigate("/login?redirect=/shipping");
    }, 500);
  };

  //Closing the cart if clicked on the outside area
  const handleOutsideClick = (event: MouseEvent) => {
    if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
      closeClickHandler();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className={styles["cart-screen-backdrop"]}>
      <div
        className={`${styles["cart-overlay"]} ${styles[cartAnimationClass]}`}
        ref={cartRef}
      >
        <div className={styles["cart-items__header"]}>
          <p>Your Tech Cart ({cart.totalQuantity})</p>
          <p onClick={closeClickHandler}>
            <FaTimes />
          </p>
        </div>

        <CartItemsBody closeClickHandler={closeClickHandler} />
        <CartItemsFooter clickHandler={checkoutClickHandler} />
      </div>
    </div>
  );
};

export default CartScreen;
