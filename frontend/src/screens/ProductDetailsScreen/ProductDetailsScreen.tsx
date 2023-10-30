import { useLocation, useParams } from "react-router-dom";
import { useGetProductQuery } from "../../store/apiSlices/productApiSlice";
import { errorHandler } from "../../utils/errorHandler";
import ProductBlock from "./ProductBlock/ProductBlock";
import Loader from "../../components/Loader";
import BackButton from "../../components/UI/BackButton/BackButton";
import { useEffect, useState } from "react";
import styles from "./ProductDetailsScreen.module.css";
import AllProductsScreen from "../AllProductsScreen/AllProductsScreen";

const ProductScreen = () => {
  const [showLoader, setShowLoader] = useState(false);

  const location = useLocation();
  //Scrolling to top on screen start
  useEffect(() => {
    window.scrollTo(0, 0);

    //Showing Loader on path change for better ux
    setShowLoader(true);

    const timeout = setTimeout(() => {
      setShowLoader(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const { id: productId } = useParams();

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [screenWidth]);

  const {
    data: product,
    isSuccess,
    isLoading,
    error,
  } = useGetProductQuery(productId!);

  if (isLoading || showLoader) {
    return <Loader />;
  }

  if (error) {
    return errorHandler(error);
  }

  return (
    <>
      <div className={styles["product-block-container"]}>
        {screenWidth > 912 && <BackButton />}
        {isSuccess && <ProductBlock product={product} />}
      </div>
      <div className={styles["suggested-products"]}>
        <AllProductsScreen showTrendingProducts={true} />
      </div>
    </>
  );
};

export default ProductScreen;
