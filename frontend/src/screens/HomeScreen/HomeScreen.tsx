import styles from "./HomeScreen.module.css";
import ProductShowcase from "../../components/ProductShowcase/ProductShowcase";
import InfoBanner from "../../components/InfoBanner/InfoBanner";
import Products from "../../components/Products/Products";
import UserReviews from "../../components/UserReviews/UserReviews";

const HomeScreen = () => {
  return (
    <div className={styles["home-screen-container"]}>
      <ProductShowcase />
      <Products />
      <InfoBanner />
      <UserReviews />
    </div>
  );
};

export default HomeScreen;
