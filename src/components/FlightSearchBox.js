import React, { useState, useEffect } from "react";
import DatePicker from "react-date-picker";
import AirportAutoComplete from "./AirportAutoComplete";
import { toUTCDate } from "../utils/dateUtils";
import { Col, Row } from "react-bootstrap";
import axios from 'axios';
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import "./FlightSearchBox.scss";

const FlightSearchBox = ({onSearchResult, setLoading}) => {
    const [fromAirport, setFromAirport] = useState(null);
    const [toAirport, setToAirport] = useState(null);
    const [departureDate, setDepartureDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(new Date());
    const [isOneWay, setIsOneWay] = useState(false);
    
    const searchFlights = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3001/api/flights');
        const flights = response.data;
        const departureDateFormatted = toUTCDate(departureDate);
        const departureFlights = flights.filter(flight => {
          const matchesDeparture = flight.from === fromAirport && flight.to === toAirport;
          const flightDepartureDateFormatted = flight.departure.split('T')[0];
          return matchesDeparture && flightDepartureDateFormatted === departureDateFormatted;
        });
    
        const departureFlightsWithTypes = departureFlights.map(flight => ({ ...flight, type: 'departure' }));
        let returnFlightsWithTypes = [];

        if (!isOneWay) {
            const returnDateFormatted = toUTCDate(returnDate);
            returnFlightsWithTypes = flights.filter(flight => {
                const matchesReturn = flight.from === toAirport && flight.to === fromAirport;
                const flightDepartureDateFormatted = flight.departure.split('T')[0];
                return matchesReturn && flightDepartureDateFormatted === returnDateFormatted;
            }).map(flight => ({ ...flight, type: 'return' }));
        }

        const filteredFlights = isOneWay ? departureFlightsWithTypes : departureFlightsWithTypes.concat(returnFlightsWithTypes);
        setLoading(false); 
        onSearchResult({ flights: filteredFlights, isOneWay });
      } catch (error) {
          console.error('Error during flight search:', error);
      } finally {
        setLoading(false); 
      }
    };

    useEffect(() => {
        if (fromAirport && toAirport && departureDate && (!isOneWay || returnDate)) {
            searchFlights();
        }
    }, [fromAirport, toAirport, departureDate, returnDate, isOneWay]);

    return (
        <Row className="flight-search_box align-items-center container">
          <Row className="container d-flex justify-content-center">
            <div className="form-check form-switch">
              <input 
                  type="checkbox" 
                  checked={isOneWay}
                  className="form-check-input" 
                  onChange={(e) => setIsOneWay(e.target.checked)}
              />
               <label className="search-header" htmlFor="flexSwitchCheckDefault">One way</label>
            </div>
          </Row>
          <Col className="airport-container"  xl={3}>
            <div className="search-header">Origin</div>
              <AirportAutoComplete 
                value={fromAirport}
                onChange={(code) => setFromAirport(code)}
                placeholder="Country, city or airport"
              />
          </Col>
          <Col className="airport-container" xl={3}>
            <div className="search-header">Destination</div>
              <AirportAutoComplete 
                  value={toAirport}
                  onChange={(code) => setToAirport(code)}
                  placeholder="Country, city or airport"
              />
          </Col>
          <Col className="date-picker-container" xl={2}>
            <div className="search-header">Departure</div>
              <DatePicker 
                onChange={setDepartureDate}
                value={departureDate}
                minDate={new Date()}

              />
          </Col>
          <Col className="date-picker-container" xl={2}>
            <div className="search-header">Return</div>
            <DatePicker 
                onChange={setReturnDate}
                value={returnDate}
                disabled={isOneWay}
                minDate={departureDate}
            />
          </Col>
        </Row>
    );
};

export default FlightSearchBox;
