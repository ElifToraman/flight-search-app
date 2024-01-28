import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons'; 
import "./FlightCard.scss";

const FlightCard = ({ flight }) => {
  const calculateFlightDuration = (departure, arrival) => {
    const departureTime = new Date(departure).getTime();
    const arrivalTime = new Date(arrival).getTime();
    const durationMillis = arrivalTime - departureTime;
    const minutes = Math.floor(durationMillis / 60000);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const departureTime = new Date(flight.departure).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const arrivalTime = new Date(flight.arrival).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const flightDuration = calculateFlightDuration(flight.departure, flight.arrival);


  return (
    <div className="flight-card my-3">
      <div className="flight-times">
        <span>{departureTime}</span>
        <span className="flight-duration">
          <FontAwesomeIcon icon={faClock} size="xs" className="pe-1"/>
          {flightDuration}
        </span>
        <span>{arrivalTime}</span>
      </div>
      <div className="flight-airports">
        <span>{flight.from_city}</span>
        <hr className="flight-line" />
        <span>{flight.to_city}</span>
      </div>
      <div className="flight-airports">
        <span>{flight.from}</span>
        <span>{flight.to}</span>
      </div>
      <div className="flight-details">
        <span>Airline: {flight.airline}</span>
        <span>Price: ${flight.price}</span>
      </div>
    </div>
  );
};

export default FlightCard;
