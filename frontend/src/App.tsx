import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
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
      <Header />
      {showCartScreen && <CartScreen />}
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
