import { Row, Col } from "react-bootstrap";
import styles from "./HomeScreen.module.css";
import Product from "../../components/Product/Product";
import { useGetProductsQuery } from "../../store/apiSlices/productApiSlice";
import { errorHandler } from "../../utils/errorHandler";
import Loader from "../../components/Loader";
import ProductShowcase from "../../components/ProductShowcase/ProductShowcase";

const HomeScreen = () => {
  // const productsQuery = useQuery({
  //   queryKey: ["latest_products"],
  //   queryFn: loadProducts,
  //   refetchOnMount: true,
  // });

  const { data: products, isLoading, error } = useGetProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return errorHandler(error);
  }

  return (
    <>
      <ProductShowcase />
      <h1>Latest Products</h1>
      <Row className={styles["latest-products"]}>
        {products?.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
