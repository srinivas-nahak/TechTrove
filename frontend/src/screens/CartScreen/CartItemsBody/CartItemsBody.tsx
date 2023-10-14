import { Card, Col, Image, Row } from "react-bootstrap";
import styles from "./CartItemsBody.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { cartAction } from "../../../store/cartSlice";

const CartItems: React.FC<{
  closeClickHandler?: () => void;
  className?: string;
}> = ({ closeClickHandler, className }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cartReducer);
  return (
    <div className={`${className} ${styles["cart-items__body"]}`}>
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
            if (cart.totalQuantity === 1 && closeClickHandler) {
              closeClickHandler();
            }
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
          <Card className={styles["cart-items__card"]} key={item.product._id}>
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
  );
};

export default CartItems;
