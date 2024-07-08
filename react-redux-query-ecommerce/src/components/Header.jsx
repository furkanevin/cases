import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const { cartTotalQuantity } = useSelector((state) => state.cart);

  return (
    <Navbar className="navbar-dark bg-black">
      <Container>
        <Navbar.Brand>
          <Link
            className="text-decoration-none text-light fw-bold"
            to={'/'}
          >
            RTK Store
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Link
              className="text-decoration-none text-light"
              to={'/cart'}
            >
              Sepet <Badge>{cartTotalQuantity}</Badge>
            </Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
