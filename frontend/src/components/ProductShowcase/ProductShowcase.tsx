import { useState } from "react";
import styles from "./ProductShowcase.module.css";

const ProductShowcase = () => {
  return (
    <div className={styles["product-showcase-container"]}>
      <div className={styles["product-1"]}>
        <h3>Smart Phones</h3>
        <img src="./images/banners/phone_banner.jpg" />
      </div>
      <div className={styles["product-2"]}>
        <h3>Game Consoles</h3>
        <img src="./images/banners/game_controller_banner.jpg" />
      </div>
      <div className={styles["product-3"]}>
        <h3>Earphones</h3>
        <img src="./images/banners/airpods_banner.jpg" />
      </div>
      <div className={styles["product-4"]}>
        <h3>Cameras</h3>
        <img src="./images/banners/camera_banner.jpg" />
      </div>
    </div>
  );
};

export default ProductShowcase;
