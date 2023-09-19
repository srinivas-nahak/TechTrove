import products from "../../products";
import styles from "./ProductScreen.module.css";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Rating from "../../components/Rating/Rating";
import { ProductType } from "../../products";

const ProductScreen = () => {
  const { id: productId } = useParams();

  const {
    name,
    image,
    description,
    category,
    price,
    countInStock,
    rating,
    numReviews,
  }: ProductType = products.find(
    (product) => product._id === parseInt(productId!)
  )!;

  return (
    <>
      <Link className="btn btn-dark my-3" to="..">
        Back
      </Link>
      <Row>
        <Col md={5}>
          <Image
            src={image}
            alt={name}
            fluid
            className={styles["product-screen__product-image"]}
          />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating rating={rating} numReviews={numReviews} />
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Price:${price}</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>{description}</p>
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
                    <Col>${price}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item className="py-3">
                  <Row>
                    <Col>Status</Col>
                    <Col>{countInStock > 0 ? "In Stock" : "Out of Stock"}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="py-4">
                  <Button className="btn-block" disabled={countInStock === 0}>
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
