import { Card } from "react-bootstrap";
import { ProductType } from "../../productType";
import styles from "./Product.module.css";
import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";

const Product: React.FC<{ product: ProductType }> = ({ product }) => {
  return (
    <Card className="my-3 " id={styles["product-item"]}>
      <Link to={`/product/${product._id}`}>
        <div className={styles["product-item__product-image-container"]}>
          <Card.Img src={product.image} variant="top" />
        </div>
      </Link>
      <Card.Body className={styles["product-item__product-details"]}>
        <Link to={`/product/${product._id}`}>
          <Card.Title className={styles["product-item__product-name"]} as="div">
            <p>{product.name}</p>
          </Card.Title>
        </Link>
        <Card.Text as="div" className={styles["product-item__product-rating"]}>
          <Rating rating={product.rating} numReviews={product.numReviews} />
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
