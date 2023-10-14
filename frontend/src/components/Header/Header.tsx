import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa"; //Font awesome libs
import { LinkContainer } from "react-router-bootstrap";
import logo from "../../assets/tech-trove-logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { cartScreenAction } from "../../store/cartScreenSlice";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { useRef, useState } from "react";
import CustomDropdown from "../UI/CustomDropdown/CustomDropdown";

const Header = () => {
  const totalCartQuantity = useSelector(
    (state: RootState) => state.cartReducer.totalQuantity
  );
  const userInfo = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const loginIconRef = useRef<HTMLAnchorElement | null>(null);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const cartClickHandler = () => {
    if (totalCartQuantity > 0) {
      dispatch(cartScreenAction.toggleCartScreen(true));
    }
  };

  const userClickHandler = () => {
    if (userInfo && userInfo.email) {
      setShowLoginDialog(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <header className={styles.Header}>
      {showLoginDialog && (
        <CustomDropdown
          elementRef={loginIconRef!}
          closeDialog={() => setShowLoginDialog(false)}
        />
      )}
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} width="9%" style={{ marginRight: "0.5rem" }} />
              TechTrove
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="ms-auto">
              {(!userInfo || !userInfo.isAdmin) && (
                <Nav.Link
                  onClick={cartClickHandler}
                  className={styles["header-shopping-cart"]}
                >
                  <FaShoppingCart />
                  {totalCartQuantity > 0 && (
                    <Badge
                      pill
                      bg="success"
                      className={`ms-1 ${styles["header-shopping-cart-badge"]}`}
                    >
                      {totalCartQuantity}
                    </Badge>
                  )}
                </Nav.Link>
              )}

              <Nav.Link onClick={userClickHandler} ref={loginIconRef}>
                <FaUser />
                {userInfo && userInfo.name}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

// {userInfo ? (
//   <NavDropdown title={userInfo.name} id="userName">
//     <LinkContainer to="/profile">
//       <NavDropdown.Item>Profile</NavDropdown.Item>
//     </LinkContainer>
//     <NavDropdown.Item>Logout</NavDropdown.Item>
//   </NavDropdown>
// ) : (
//   <LinkContainer to="/login">
//     <Nav.Link>
//       <FaUser /> Sign In
//     </Nav.Link>
//   </LinkContainer>
// )}

{
  /* <Nav.Link
  onClick={cartClickHandler}
  className={`me-2 ${styles["header-shopping-cart"]}`}
>
  <FaShoppingCart />
  {totalCartQuantity > 0 && (
    <Badge
      pill
      bg="success"
      className={`ms-1 ${styles["header-shopping-cart-badge"]}`}
    >
      {totalCartQuantity}
    </Badge>
  )}
</Nav.Link>; */
}

{
  /* <Nav.Link
  onClick={cartClickHandler}
  style={{ position: "relative" }}
  className="me-2"
>
  <FaShoppingCart />
  {totalCartQuantity > 0 && (
    <Badge
      pill
      bg="success"
      className="ms-1"
      style={{
        position: "absolute",
        top: "30%",
        left: "0",
        transform: "translate(50%, -50%)", // Center the badge
      }}
    >
      {totalCartQuantity}
    </Badge>
  )}
</Nav.Link>; */
}
