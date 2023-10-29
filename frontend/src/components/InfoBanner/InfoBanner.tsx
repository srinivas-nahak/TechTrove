import { useNavigate } from "react-router-dom";
import CustomButton from "../UI/CustomButton/CustomButton";
import styles from "./InfoBanner.module.css";

const InfoBanner = () => {
  const navigate = useNavigate();

  const shopClickHandler = () => {
    navigate("/products/all");
  };

  return (
    <>
      <div className={styles["info-banner-container"]}>
        <div className={styles["info-text-container"]}>
          <h1>Tech Haven: Seamlessly Integrated Gadgets</h1>
          <p>
            Explore our store for tech wonders designed to work together
            seamlessly. Discover standard sizes and compatibility to create your
            ideal tech setup.
          </p>
          <CustomButton onClick={shopClickHandler}>Shop Now</CustomButton>
        </div>
        <div className={styles["info-img-container"]}>
          <img
            src="./images/banners/gadget_collection_banner.jpg"
            alt="bannerImg"
          />
        </div>
      </div>
    </>
  );
};

export default InfoBanner;
