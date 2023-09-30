import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import styles from "./App.module.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartScreen from "./screens/CartScreen/CartScreen";
import { useSelector } from "react-redux";
import { RootState } from "./store";

function App() {
  const showCartScreen = useSelector(
    (state: RootState) => state.cartScreenReducer.showCartScreen
  );

  return (
    <>
      <Header className={styles.header} />
      {showCartScreen && <CartScreen />}
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer className={styles.Footer} />
    </>
  );
}

export default App;
