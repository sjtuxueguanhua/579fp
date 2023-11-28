import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from '../api/WeatherApi';

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  console.log('something here');
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchWeatherData();
      setWeatherData(data);
    };
    loadData();
  }, []);
  console.log('weatherdata is ',weatherData)

  return (

    <div>
      {weatherData && <p>Current Weather: {weatherData.main.temp}°C</p>}
    </div>
  );
};

export default WeatherPage;
