import styles from "./ProductScreen.module.css";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Rating from "../../components/Rating/Rating";
import { ProductType } from "../../productType";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { loadProduct } from "../../utils/fetch-product-helper";

const ProductScreen = () => {
  const { id: productId } = useParams();

  const [productBlock, setProductBlock] = useState(<></>);

  const postQuery = useQuery({
    queryKey: ["latest_products", parseInt(productId!)],
    queryFn: () => loadProduct(parseInt(productId!)),
    onSuccess: (data: ProductType) => setProductBlock(getProductBlock(data)),
    onError: () =>
      setProductBlock(
        <h1 style={{ textAlign: "center" }}>Product Not Found!</h1>
      ),
  });

  let getProductBlock = (product: ProductType) => (
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
            <strong>Price:${product.price}</strong>
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
                  <Col>${product.price}</Col>
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
              <ListGroup.Item className="py-4">
                <Button
                  className="btn-block"
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );

  return (
    <>
      <Link className="btn btn-dark my-3" to="..">
        Back
      </Link>
      {productBlock}
    </>
  );
};

export default ProductScreen;
