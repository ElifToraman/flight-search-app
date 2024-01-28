import React, { useState } from 'react';
import { Row, Col, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneArrival, faPlaneDeparture } from '@fortawesome/free-solid-svg-icons'; 
import FlightCard from './FlightCard';

const FlightList = ({ flights, searchMade, isOneWay }) => {
  const [sortKey, setSortKey] = useState('departure');
  const [sortTitle, setSortTitle] = useState('Sort by'); 

  
  const sortFlights = (flights, key) => {
    return flights.sort((a, b) => {
      switch (key) {
        case 'price':
          return a.price - b.price;
        case 'duration':
          const durationA = new Date(a.arrival) - new Date(a.departure);
          const durationB = new Date(b.arrival) - new Date(b.departure);
          return durationA - durationB;
        case 'departure':
          return new Date(a.departure) - new Date(b.departure);
        default:
          return 0;
      }
    });
  };

  const handleSortClick = (key, title) => {
    setSortKey(key);
    setSortTitle(title);
  };

  const departureFlights = sortFlights(flights.filter(flight => flight.type === 'departure'), sortKey);
  const returnFlights = sortFlights(flights.filter(flight => flight.type === 'return'), sortKey === 'returnDeparture' ? 'departure' : sortKey);

  const getFlightDates = (flights) => {
    if (flights && flights.length > 0) {
      const departureDate = new Date(flights[0].departure).toLocaleDateString();
      let returnDate = '';
      if (!isOneWay) {
        const returnFlight = flights.find(flight => flight.type === 'return');
        returnDate = returnFlight ? returnDate : '';
      }
      return departureDate + returnDate;
    }
    return '';
  };

  const noSearchMessage = (
    <div className="text-center mt-5">
      <h2>Welcome to SearchFlights!</h2>
      <p>To find flights that suit your schedule, start by entering your travel details in the search box above.</p>
    </div>
  );

  return (
    <>
    {searchMade ? (
    <>
     <Row className="mt-5 align-items-center d-flex justify-content-center">
        <Col lg={isOneWay ? 10 : 6}>
            <h2 className="mb-0">{getFlightDates(departureFlights)}</h2>
        </Col>
        {!isOneWay && searchMade && (
            <Col>
                <h2 className="mb-0">{getFlightDates(returnFlights)}</h2>
            </Col>
        )}
        {searchMade && departureFlights.length > 0 && (
            <Col lg={2}>
                <Dropdown>
                    <Dropdown.Toggle variant="secondary">
                        {sortTitle}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleSortClick('price', 'Cheapest First')}>Cheapest First</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSortClick('duration', 'Fastest First')}>Fastest First</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSortClick('departure', 'Outbound: Departure Time')}>Outbound: Departure Time</Dropdown.Item>
                        {!isOneWay && (
                            <Dropdown.Item onClick={() => handleSortClick('departure', 'Return: Departure Time')}>Return: Departure Time</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
        )}
    </Row>
    <Row className="mt-4">
        {isOneWay || departureFlights.length > 0 ? (
            <Col xs={12} lg={isOneWay ? 12 : 6}>
                <h2>
                    <span className="pe-1">
                        <FontAwesomeIcon icon={faPlaneDeparture} size="xs" />
                    </span>
                    Departure Flights
                </h2>
                {departureFlights.length > 0 ? (
                    departureFlights.map((flight) => (
                        <FlightCard key={flight.id} flight={flight} />
                    ))
                ) : (
                    <p>No outbound flights were found for the selected date.</p>
                )}
            </Col>
        ) : searchMade ? (
            <Col xs={12} lg={6}>
                <h2>
                    <span className="pe-1">
                        <FontAwesomeIcon icon={faPlaneDeparture} size="xs" />
                    </span>
                    Departure Flights
                </h2>
                <p>No outbound flights were found for the selected date.</p>
            </Col>
        ) : null}
        {!isOneWay && searchMade ? (
            <Col xs={12} lg={6}>
                <h2>
                    <span className="pe-1">
                        <FontAwesomeIcon icon={faPlaneArrival} size="xs" />
                    </span>
                    Return Flights
                </h2>
                {returnFlights.length > 0 ? (
                    returnFlights.map((flight) => (
                        <FlightCard key={flight.id} flight={flight} />
                    ))
                ) : (
                    <p>No return flights were found for the selected dates.</p>
                )}
            </Col>
        ) : null}
    </Row>
    </> 
    ): ( 
        noSearchMessage
    )}
    </>
  );
};

export default FlightList;
