import { useSelector } from "react-redux";
import styles from "./CartScreen.module.css";
import { RootState } from "../../store";
import { FaTimes } from "react-icons/fa";
import { Card, Row, Col, Image, ListGroup, Form } from "react-bootstrap";

const CartScreen = () => {
  const cart = useSelector((state: RootState) => state.cartReducer);

  return (
    <div className={styles["cart-screen-backdrop"]}>
      <div className={styles["cart-items-container"]}>
        <div className={styles["cart-items__header"]}>
          <h6>Your Tech Cart ({cart.totalQuantity})</h6>
          <h6>
            <FaTimes />
          </h6>
        </div>
        {cart.items.map((item) => {
          return (
            <Card className={styles["cart-items__card"]}>
              <Card.Body className="p-0">
                <Row>
                  <Col className="pe-1">
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
                        <p>+</p>
                        <input
                          type="number"
                          defaultValue={item.quantity}
                          max={10}
                        />
                        <p>-</p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CartScreen;
