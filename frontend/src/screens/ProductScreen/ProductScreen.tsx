import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../../store/apiSlices/productApiSlice";
import { errorHandler } from "../../utils/errorHandler";
import ProductBlock from "./ProductBlock/ProductBlock";
import Loader from "../../components/Loader";

const ProductScreen = () => {
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

  return (
    <>
      <Link className="btn btn-dark my-3" to="..">
        Back
      </Link>

      {isSuccess && <ProductBlock product={product} />}
    </>
  );
};

export default ProductScreen;
