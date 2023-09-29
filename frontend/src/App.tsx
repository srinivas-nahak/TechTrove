import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import styles from "./App.module.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartScreen from "./screens/CartScreen/CartScreen";

function App() {
  return (
    <>
      <Header className={styles.header} />
      <CartScreen />
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
