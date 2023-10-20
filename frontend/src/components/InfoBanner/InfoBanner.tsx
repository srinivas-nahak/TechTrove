import CustomButton from "../UI/CustomButton/CustomButton";
import styles from "./InfoBanner.module.css";

const InfoBanner = () => {
  return (
    <>
      <div className={styles["info-banner-container"]}>
        <div className={styles["info-text-container"]}>
          <h3>Tech Haven: Seamlessly Integrated Gadgets</h3>
          <p>
            Explore our store for tech wonders designed to work together
            seamlessly. Discover standard sizes and compatibility to create your
            ideal tech setup.
          </p>
          <CustomButton>Shop Now</CustomButton>
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
