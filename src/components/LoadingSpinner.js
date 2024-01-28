import { Row, Col } from 'react-bootstrap';
import { BeatLoader} from 'react-spinners';

const LoadingSpinner = () => {
  return (
    <Row className="justify-content-center align-items-center mt-5">
      <Col className="text-center py-5">
        <h3 className="mb-3">Loading...</h3>
          <BeatLoader color="silver" size={30} margin={2} />
          <span className="visually-hidden">Loading...Please wait</span>
      </Col>
    </Row>
  );
};

export default LoadingSpinner;
