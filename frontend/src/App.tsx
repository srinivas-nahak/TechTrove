import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import styles from "./App.module.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header className={styles.header} />
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
