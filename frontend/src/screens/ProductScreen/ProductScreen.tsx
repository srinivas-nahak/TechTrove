import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../../store/apiSlices/productApiSlice";
import { errorHandler } from "../../utils/errorHandler";
import ProductBlock from "./ProductBlock/ProductBlock";
import Loader from "../../components/Loader";
import CustomButton from "../../components/UI/CustomButton/CustomButton";
import styles from "./ProductScreen.module.css";
import BackIcon from "../../assets/back.svg?react";

const ProductScreen = () => {
  const navigate = useNavigate();
  const { id: productId } = useParams();

  const {
    data: product,
    isSuccess,
    isLoading,
    error,
  } = useGetProductQuery(productId!);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return errorHandler(error);
  }

  const backClickHandler = () => {
    navigate("..");
  };

  return (
    <>
      <CustomButton
        onClick={backClickHandler}
        className={styles["back-button"]}
      >
        <BackIcon />
      </CustomButton>

      {isSuccess && <ProductBlock product={product} />}
    </>
  );
};

export default ProductScreen;
