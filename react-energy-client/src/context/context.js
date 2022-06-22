import React, { useState } from 'react';
import axios from 'axios';

const rootUrl = 'http://localhost:3080';

const EnergyContext = React.createContext();

// Provider, Consumer - EnergyContext.Provider

const EnergyProvider = ({ children }) => {
  const [cityTemperature, setCityTemperature] = useState({properties: { parameter: {T2M: [] } }});
  // request loading
  const [isLoading, setIsLoading] = useState(false);
  // error
  const [error, setError] = useState({ show: false, msg: '' });
  
  const searchCityTemperature = async (location, month, year) => {
    const d = new Date();
    const y = year || d.getFullYear();
    const m = month || d.toLocaleString('en-US', {month: 'long'}).toLowerCase();
    toggleError();
    setIsLoading(true);
    
    const response = await axios.get(`${rootUrl}/api/getTemporalDaily?location=${location}&month=${m}&year=${y}`).catch((err) =>
      console.log(err)
    );
    if (response) {
      setCityTemperature(response.data);
    } else {
      setCityTemperature({properties: { parameter: {T2M: [] } }});
      toggleError(true, 'there is no city with that name');
    }
    setIsLoading(false);
  };

  function toggleError(show = false, msg = '') {
    setError({ show, msg });
  }
  
  // get city details on load
  /* useEffect(() => {
    searchCityTemperature('Nagpur');
  }, []); */
  return (
    <EnergyContext.Provider
      value={{
        cityTemperature,
        error,
        searchCityTemperature,
        isLoading,
      }}
    >
      {children}
    </EnergyContext.Provider>
  );
};

export { EnergyProvider, EnergyContext };
