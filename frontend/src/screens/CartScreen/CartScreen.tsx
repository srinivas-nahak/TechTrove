import { useDispatch, useSelector } from "react-redux";
import styles from "./CartScreen.module.css";
import { RootState } from "../../store";
import { FaTimes } from "react-icons/fa";
import { Card, Row, Col, Image, Button } from "react-bootstrap";
import { cartAction } from "../../store/cartSlice";
import { cartScreenAction } from "../../store/cartScreenSlice";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    navigate("/login?redirect=/shipping");
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
          <h6>Your Tech Cart ({cart.totalQuantity})</h6>
          <h6 onClick={closeClickHandler}>
            <FaTimes />
          </h6>
        </div>
        <div className={styles["cart-items__body"]}>
          {cart.items.map((item) => {
            const stockQty = item.product.countInStock;

            const incrementHandler = () => {
              if (item.quantity === stockQty) {
                return;
              }

              dispatch(
                cartAction.addToCart({
                  product: item.product,
                  quantity: item.quantity + 1,
                })
              );
            };
            const decrementHandler = () => {
              //Removing entire entire item if item.quantity=0
              if (item.quantity - 1 === 0) {
                dispatch(
                  cartAction.removeFromCart({
                    product: item.product,
                    quantity: 0,
                  })
                );
                //When all quantity is becoming 0 then closing the cart
                if (cart.totalQuantity === 1) closeClickHandler();
                return;
              }
              dispatch(
                cartAction.addToCart({
                  product: item.product,
                  quantity: item.quantity - 1,
                })
              );
            };

            return (
              <Card
                className={styles["cart-items__card"]}
                key={item.product._id}
              >
                <Card.Body className="p-0">
                  <Row>
                    <Col
                      className={`pe-1 ${styles["cart-items__image-container"]}`}
                    >
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fluid
                      />
                    </Col>
                    <Col className={styles["cart-items__details"]}>
                      <div className={styles["cart-items__title"]}>
                        {item.product.name}
                      </div>
                      <div className={styles["cart-items__price-container"]}>
                        <div className={styles["cart-items__price"]}>
                          ${item.product.price}
                        </div>
                        <div className={styles["cart-items__qty-controller"]}>
                          <p onClick={decrementHandler}>-</p>
                          <input type="number" value={item.quantity} readOnly />
                          <p onClick={incrementHandler}>+</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            );
          })}
        </div>
        <div className={styles["cart-items__footer"]}>
          <div className={styles["cart-items__price-details"]}>
            <Row className={styles["cart-items__price-details-item"]}>
              <Col>Shipping:</Col>
              <Col style={cart.shippingPrice === 0 ? { color: "#198754" } : {}}>
                {cart.shippingPrice === 0 ? "Free" : `$${cart.shippingPrice}`}
              </Col>
            </Row>
            <Row className={styles["cart-items__price-details-item"]}>
              <Col>Total:</Col>
              <Col>${cart.totalPrice}</Col>
            </Row>
          </div>
          <Button
            variant="success"
            className={styles["cart-items__checkout-button"]}
            onClick={checkoutClickHandler}
          >
            Secure Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
