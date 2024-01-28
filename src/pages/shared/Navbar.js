import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./Navbar.scss";

const Navbar = () => {
 
  return (
    <nav className="navbar_header">
      <Row className="d-flex justify-content-between">
        <Col className="d-flex justify-content-start align-items-center">
          <Link href="/" className="logo">
            SearchFlights
          </Link>
        </Col>
      </Row>
    </nav>
  );
};

export default Navbar;
