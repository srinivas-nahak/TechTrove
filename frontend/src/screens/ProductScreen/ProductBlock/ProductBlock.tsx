import { Row, Col, Image, ListGroup, Card, Form } from "react-bootstrap";
import styles from "./ProductBlock.module.css";
import Rating from "../../../components/Rating/Rating";
import { ProductType } from "../../../utils/customTypes";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../../../store/cartSlice";
import { RootState } from "../../../store";
import { cartScreenAction } from "../../../store/cartScreenSlice";
import CustomButton from "../../../components/UI/CustomButton/CustomButton";

const ProductBlock: React.FC<{ product: ProductType }> = ({ product }) => {
  const [priceCounter, setPriceCounter] = useState(product.price);
  const qtyRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const existingCartProduct = useSelector((state: RootState) =>
    state.cartReducer.items.find((item) => item.product._id === product._id)
  );

  const alreadyAddedQuantity = existingCartProduct?.quantity ?? 0;

  const qtyChangeHandler = () => {
    if (qtyRef.current) {
      if (qtyRef.current.value === "0") return;
      setPriceCounter(product.price * parseInt(qtyRef.current.value));
    }
  };

  const addToCartHandler = () => {
    const qty = parseInt(qtyRef.current?.value ?? "") ?? 0;

    ///If current added quantity + previously added quantity is more than stock then exiting
    const quantityMoreThanStock =
      qty + alreadyAddedQuantity > product.countInStock;

    if (qty === 0 || quantityMoreThanStock) return;

    dispatch(
      cartAction.addToCart({
        product,
        quantity: qty,
      })
    );
    //navigate("/cart");

    //Opening CartScreen
    dispatch(cartScreenAction.toggleCartScreen(true));
  };

  return (
    <Row>
      <Col md={5}>
        <Image
          src={product.image}
          alt={product.name}
          fluid
          className={styles["product-screen__product-image"]}
        />
      </Col>
      <Col md={4}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h3>{product.name}</h3>
          </ListGroup.Item>
          <ListGroup.Item>
            <Rating
              rating={product.rating || 0}
              numReviews={product.numReviews || 0}
            />
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>${product.price}</strong>
          </ListGroup.Item>
          <ListGroup.Item>
            <p>{product.description}</p>
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={3}>
        <Card className={styles["product-add-cart-card"]}>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item className="py-3">
                <Row>
                  <Col>Price</Col>
                  <Col>${priceCounter}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className="py-3">
                <Row>
                  <Col>Status</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Quantity</Col>
                    <Col>
                      <Form.Control
                        defaultValue={1}
                        ref={qtyRef}
                        type="number"
                        min={0}
                        max={product.countInStock}
                        onChange={qtyChangeHandler}
                      />
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item className="py-4">
                <CustomButton
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                  style={
                    product.countInStock === 0
                      ? { backgroundColor: "#2fa535" }
                      : {}
                  }
                >
                  Add To Cart
                </CustomButton>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ProductBlock;

// {[...Array(product.countInStock).keys()].map(
//   (index) => (
//     <option key={index + 1} value={index + 1}>
//       {index + 1}
//     </option>
//   )
// )}
