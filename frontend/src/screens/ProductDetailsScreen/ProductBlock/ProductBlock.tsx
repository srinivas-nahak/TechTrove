import styles from "./ProductBlock.module.css";
import Rating from "../../../components/Rating/Rating";
import { ProductType } from "../../../utils/customTypes";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { cartAction } from "../../../store/cartSlice";
import { cartScreenAction } from "../../../store/cartScreenSlice";
import CustomButton from "../../../components/UI/CustomButton/CustomButton";
import QuantityController from "../../../components/QuantityController/QuantityController";

const ProductBlock: React.FC<
  React.HTMLProps<HTMLElement> & { product: ProductType }
> = ({ product, className, ...otherProps }) => {
  const [priceCounter, setPriceCounter] = useState(product.price);
  const qtyRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  // const existingCartProduct = useSelector((state: RootState) =>
  //   state.cartReducer.items.find((item) => item.product._id === product._id)
  // );

  const qtyChangeHandler = (addedQty: number) => {
    if (addedQty === 0) return;

    const calculatedPrice = product.price * addedQty;
    setPriceCounter(Number(calculatedPrice.toFixed(2)));
  };

  const addToCartHandler = () => {
    const qty = parseInt(qtyRef.current?.value ?? "") ?? 0;

    ///If current added quantity + previously added quantity is more than stock then exiting
    const quantityMoreThanStock = qty > product.countInStock;

    if (qty === 0 || quantityMoreThanStock) return;

    dispatch(
      cartAction.addToCart({
        product,
        quantity: qty,
      })
    );

    //Opening CartScreen
    dispatch(cartScreenAction.toggleCartScreen(true));
  };

  return (
    <div className={`${className} ${styles["product-details-container"]}`}>
      <img
        src={product.image}
        alt={product.name}
        className={styles["product-image"]}
      />

      <div className={styles["product-details"]}>
        <h1 className={styles["product-title"]}>{product.name}</h1>

        <Rating
          rating={product.rating || 0}
          numReviews={product.numReviews || 0}
          className={styles["product-rating"]}
        />

        <p className={styles["product-price"]}>${priceCounter}</p>

        <p className={styles["product-description"]}>{product.description}</p>

        <div className={styles["product-checkout-container"]}>
          {product.countInStock > 0 && (
            <QuantityController
              stockCount={product.countInStock}
              onQuantityChange={qtyChangeHandler}
              ref={qtyRef}
            />
          )}

          <CustomButton
            disabled={product.countInStock === 0}
            onClick={addToCartHandler}
            style={
              product.countInStock === 0 ? { backgroundColor: "#a1a1a1" } : {}
            }
          >
            {product.countInStock === 0 ? "Out of Stock" : "Add To Cart"}
          </CustomButton>
        </div>
        <small className={styles["product-free-shipping-txt"]}>
          2 days Express Delivery |{" "}
          <span style={{ fontWeight: "500", color: "#9f9f9f" }}>
            Free shipping on orders over $100
          </span>{" "}
          | Free returns.
        </small>
      </div>
    </div>
  );
};

export default ProductBlock;

{
  /* {product.countInStock > 0 && (
            <input
              defaultValue={1}
              ref={qtyRef}
              type="number"
              min={0}
              max={product.countInStock}
              onChange={qtyChangeHandler}
              className="flex-grow-0"
            />
          )} */
}

// {[...Array(product.countInStock).keys()].map(
//   (index) => (
//     <option key={index + 1} value={index + 1}>
//       {index + 1}
//     </option>
//   )
// )}
