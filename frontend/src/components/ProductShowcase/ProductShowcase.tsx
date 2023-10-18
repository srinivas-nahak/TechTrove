import styles from "./ProductShowcase.module.css";

const ProductShowcase = () => {
  return (
    <div className={styles["product-showcase-container"]}>
      <div className={styles["product-1"]}>
        <img src="../../../public/images/phone.jpg" />
      </div>
      <div className={styles["product-2"]}>
        <img src="../../../public/images/playstation.jpg" />
      </div>
      <div className={styles["product-3"]}>
        <img src="../../../public/images/airpods.jpg" />
      </div>
      <div className={styles["product-4"]}>
        <img src="../../../public/images/camera.jpg" />
      </div>
    </div>
  );
};

export default ProductShowcase;
