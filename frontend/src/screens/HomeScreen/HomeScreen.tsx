import { Row, Col } from "react-bootstrap";
import { ProductType } from "../../productType";
import styles from "./HomeScreen.module.css";
import Product from "../../components/Product/Product";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { loadProducts } from "../../utils/fetch-product-helper";

const HomeScreen = () => {
  const productsQuery = useQuery({
    queryKey: ["latest_products"],
    queryFn: loadProducts,
    refetchOnMount: true,
  });

  return (
    <>
      <h1>Latest Products</h1>
      <Row className={styles["latest-products"]}>
        {productsQuery?.data?.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
