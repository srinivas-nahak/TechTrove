import { useState } from "react";
import styles from "./ProductShowcase.module.css";
import { useNavigate } from "react-router-dom";

const ProductShowcase = () => {
  const navigate = useNavigate();

  const smartPhoneClickHandler = (categoryName: string) => {
    navigate(`/products/${categoryName}`);
  };

  return (
    <div className={styles["product-showcase-container"]}>
      <div
        className={styles["product-1"]}
        onClick={() => smartPhoneClickHandler("smart_phones")}
      >
        <h3>Smart Phones</h3>
        <img src="./images/banners/phone_banner.jpg" />
      </div>
      <div
        className={styles["product-2"]}
        onClick={() => smartPhoneClickHandler("game_consoles")}
      >
        <h3>Game Consoles</h3>
        <img src="./images/banners/game_controller_banner.jpg" />
      </div>
      <div
        className={styles["product-3"]}
        onClick={() => smartPhoneClickHandler("earphones")}
      >
        <h3>Earphones</h3>
        <img src="./images/banners/airpods_banner.jpg" />
      </div>
      <div
        className={styles["product-4"]}
        onClick={() => smartPhoneClickHandler("cameras")}
      >
        <h3>Cameras</h3>
        <img src="./images/banners/camera_banner.jpg" />
      </div>
    </div>
  );
};

export default ProductShowcase;
