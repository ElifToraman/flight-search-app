import { Row } from "react-bootstrap";
import { Link } from 'react-router-dom';

const Footer = () => {

  return (
    <div className="footer justify-content-center align-items-center mt-5">
      <Row className=" d-flex justify-content-center mx-3 mb-3 fw-bold">© 2024 Company, Inc</Row>
      <div className="d-flex justify-content-center">
      <Link to="/" target="_blank" className="mx-1 navbar_items">
          Terms and Conditions
        </Link>
        <p>•</p>
        <Link to="/" target="_blank" className="mx-1 navbar_items">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
};

export default Footer;
