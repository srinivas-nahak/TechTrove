import { Ref, forwardRef, useState } from "react";
import styles from "./QuantityController.module.css";

const QuantityController: React.FC<{
  decrementHandler?: () => void;
  incrementHandler?: () => void;
  stockCount: number;
  addedQuantity?: number;
  onQuantityChange?: (qty: number) => void;
  ref?: Ref<HTMLInputElement>;
  variant?: "small" | "normal";
}> = forwardRef(
  (
    {
      incrementHandler,
      decrementHandler,
      stockCount,
      addedQuantity,
      onQuantityChange,
      variant = "normal",
    },
    ref
  ) => {
    const [qty, setQty] = useState(1);

    const defaultIncrementHandler = () => {
      if (qty === stockCount) {
        return;
      }

      setQty((currentQty) => {
        const updatedQty = currentQty + 1;
        if (onQuantityChange) onQuantityChange(updatedQty);

        return updatedQty;
      });
    };
    const defaultDecrementHandler = () => {
      if (qty === 0) return;
      setQty((currentQty) => {
        const updatedQty = currentQty - 1;
        if (onQuantityChange) onQuantityChange(updatedQty);
        return updatedQty;
      });
    };

    return (
      <div
        className={
          variant && variant === "small"
            ? `${styles["qty-controller"]} ${styles.small}`
            : `${styles["qty-controller"]}`
        }
      >
        <p
          onClick={
            decrementHandler ? decrementHandler : defaultDecrementHandler
          }
        >
          -
        </p>
        <input
          className={styles["qty-controller_input"]}
          type="number"
          value={addedQuantity ? addedQuantity : qty}
          readOnly
          ref={ref ? ref : null}
        />
        <p
          onClick={
            incrementHandler ? incrementHandler : defaultIncrementHandler
          }
        >
          +
        </p>
      </div>
    );
  }
);

export default QuantityController;
