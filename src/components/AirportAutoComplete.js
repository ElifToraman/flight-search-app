import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

const AirportAutoComplete = ({ value, onChange, placeholder }) => {
    const [airports, setAirports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAirports = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:3001/api/airports');
                setAirports(response.data.map(airport => ({
                    value: airport.code,
                    label: `${airport.city} (${airport.name})`,
                    city: airport.city,
                    code: airport.code
                })));
                setError(null);
            } catch (err) {
                setError('An error occurred loading airports.');
            } finally {
                setLoading(false);
            }
        };

        fetchAirports();
    }, []);
    
    const customStyles = {
        indicatorSeparator: () => ({
          display: 'none',
        }),
        dropdownIndicator: () => ({
          display: 'none',
        }),
      };

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <Select 
                    options={airports}
                    onChange={(selectedOption) => onChange(selectedOption.value)}
                    value={airports.find(option => option.value === value)}
                    placeholder={placeholder}
                    styles={customStyles}
                    formatOptionLabel={(option) => (
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                {option.label}
                            </div>
                            <div>
                                {option.code}
                            </div>
                        </div>
                    )}
                    filterOption={(option, input) => {
                        if (input) {
                            const searchTerm = input.toLowerCase();
                            return option.data.city.toLowerCase().includes(searchTerm) || 
                                   option.data.code.toLowerCase().includes(searchTerm);
                        }
                        return true;
                    }}
                />
            )}
        </div>
    );
};

export default AirportAutoComplete;
