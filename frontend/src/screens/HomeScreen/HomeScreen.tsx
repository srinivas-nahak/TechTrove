import styles from "./HomeScreen.module.css";
import ProductShowcase from "../../components/ProductShowcase/ProductShowcase";
import InfoBanner from "../../components/InfoBanner/InfoBanner";
import UserReviews from "../../components/UserReviews/UserReviews";
import AllProductsScreen from "../AllProductsScreen/AllProductsScreen";

const HomeScreen = () => {
  return (
    <div className={styles["home-screen-container"]}>
      <ProductShowcase />
      <AllProductsScreen showTrendingProducts={true} />
      <InfoBanner />
      <UserReviews />
    </div>
  );
};

export default HomeScreen;
