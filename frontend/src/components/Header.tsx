import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa"; //Font awesome libs
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/tech-trove-logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { cartScreenAction } from "../store/cartScreenSlice";

const Header: React.FC<{ className: string }> = ({ className }) => {
  const totalCartQuantity = useSelector(
    (state: RootState) => state.cartReducer.totalQuantity
  );
  const dispatch = useDispatch();

  const cartClickHandler = () => {
    if (totalCartQuantity > 0) {
      dispatch(cartScreenAction.toggleCartScreen(true));
    }
  };

  return (
    <header className={className}>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
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
              <Nav.Link onClick={cartClickHandler}>
                <FaShoppingCart /> Cart
                {totalCartQuantity > 0 && (
                  <Badge pill bg="success" className="ms-2">
                    {totalCartQuantity}
                  </Badge>
                )}
              </Nav.Link>
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaUser /> Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
