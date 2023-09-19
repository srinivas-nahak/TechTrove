import { Row, Col } from "react-bootstrap";
import products from "../../products";
import styles from "./HomeScreen.module.css";
import Product from "../../components/Product/Product";

const HomeScreen = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row className={styles["latest-products"]}>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
