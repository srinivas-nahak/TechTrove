/// <reference types="vite-plugin-svgr/client" />

import logo from "../../assets/tech-trove-logo.svg";
import ShoppingBagIcon from "../../assets/shopping_bag.svg?react";
import PersonIcon from "../../assets/person.svg?react";
import SearchIcon from "../../assets/search.svg?react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { cartScreenAction } from "../../store/cartScreenSlice";
import { Link, useNavigate } from "react-router-dom";
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
  const loginIconRef = useRef<HTMLDivElement | null>(null);
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
      <Link className={styles["header-logo-section"]} to="/">
        <img
          src={logo}
          width="9%"
          style={{ marginRight: "0.5rem" }}
          alt="Logo"
        />
        <h3>TechTrove</h3>
      </Link>

      <nav>
        <div
          onClick={cartClickHandler}
          className={styles["header-shopping-cart"]}
        >
          <ShoppingBagIcon />
          {totalCartQuantity > 0 && (
            <div className={styles["header-shopping-cart-badge"]}>
              {totalCartQuantity}
            </div>
          )}
        </div>
        <div
          onClick={userClickHandler}
          ref={loginIconRef}
          className={styles["header-user"]}
        >
          <PersonIcon />
          {userInfo && userInfo.name}
        </div>
      </nav>
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

//The working code
{
  /* <Navbar bg="dark" variant="dark" expand="md">
  <Container>
    <LinkContainer to="/">
      <Navbar.Brand>
        <img src={logo} width="9%" style={{ marginRight: "0.5rem" }} />
        TechTrove
      </Navbar.Brand>
    </LinkContainer>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />

    <Navbar.Collapse id="basic-navbar-nav">
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
</Navbar>; */
}
