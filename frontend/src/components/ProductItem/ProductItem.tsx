import { ProductType } from "../../utils/customTypes";
import styles from "./ProductItem.module.css";
import { Link } from "react-router-dom";
import Card from "../UI/Card/Card";

const ProductItem: React.FC<{ product: ProductType }> = ({ product }) => {
  return (
    <Card id={styles["product-item-container"]}>
      <Link
        to={`/product/${product._id}`}
        className={styles["product-item-image-container"]}
      >
        <img src={product.image} />
      </Link>
      <Link
        to={`/product/${product._id}`}
        className={styles["product-item-name"]}
      >
        <p>{product.name}</p>
      </Link>

      <h3>${product.price}</h3>
    </Card>
  );
};

export default ProductItem;
{
  /* <Card className={`my-3 ${styles["product-item"]}`}>
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
    </Card> */
}
