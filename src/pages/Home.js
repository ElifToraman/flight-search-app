import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Navbar from "./shared/Navbar";
import Footer from './shared/Footer';
import FlightSearchBox from '../components/FlightSearchBox';
import FlightList from '../components/FlightList';
import LoadingSpinner from '../components/LoadingSpinner';
import "./Home.scss";

const Home = () => {
    const [flightResults, setFlightResults] = useState([]);
    const [searchMade, setSearchMade] = useState(false); 
    const [isOneWay, setIsOneWay] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSearchResults = (resultData) => {
        setFlightResults(resultData.flights);
        setIsOneWay(resultData.isOneWay);  
        setSearchMade(true);
        setLoading(false); 
    };

  return (
      <div className="main-wrapper">
        <Navbar />
        <div className="d-flex justify-content-center search-box-container py-4">
            <FlightSearchBox onSearchResult={handleSearchResults} setLoading={setLoading}/>
        </div>
        <Container className="content">
            {loading ? <LoadingSpinner /> : <FlightList flights={flightResults} searchMade={searchMade} isOneWay={isOneWay} />}
        </Container>
        <Footer />
      </div>
  );
};

export default Home;
