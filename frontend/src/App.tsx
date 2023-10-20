import styles from "./App.module.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import CartScreen from "./screens/CartScreen/CartScreen";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import Newsletter from "./components/Newsletter/Newsletter";

function App() {
  const showCartScreen = useSelector(
    (state: RootState) => state.cartScreenReducer.showCartScreen
  );

  return (
    <>
      <Header />
      {showCartScreen && <CartScreen />}
      <main className={styles.Main}>
        <Outlet />
      </main>
      <Newsletter />
      <Footer />
    </>
  );
}

export default App;
