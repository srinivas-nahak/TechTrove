import { useGetProductsQuery } from "../../store/apiSlices/productApiSlice";
import { errorHandler } from "../../utils/errorHandler";
import Loader from "../Loader";
import styles from "./Products.module.css";
import ProductItem from "./ProductItem/ProductItem";

const Products = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return errorHandler(error);
  }

  return (
    <div className={styles["products-container"]}>
      <h1>Our Top Picks</h1>
      <div className={styles["product-items"]}>
        {products?.map((product) => (
          <ProductItem product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default Products;
