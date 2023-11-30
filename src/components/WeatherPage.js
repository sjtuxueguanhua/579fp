import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from '../api/WeatherApi';
import './WeatherPage.css'; 


import { cities } from '../utils/cities';



const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await fetchWeatherData(lat, lon);
    setWeatherData(data);
  };
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setSelectedCity(''); // Reset city selection
  };
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    const cityCoords = cities[selectedCountry][event.target.value];
    if (cityCoords) {
      fetchWeatherData(cityCoords.lat, cityCoords.lon).then(setWeatherData);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchWeatherData();
      setWeatherData(data);
    };
    loadData();
  }, []);

  const kelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(2);
  };

  return (
    <>
     <h1 className="header-title">Hey there! Pop in your location and let's see if it's a good night for stargazing.</h1>
    <div className="weather-container">
      
        <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input 
            type="text" 
            placeholder="Latitude" 
            value={lat} 
            onChange={(e) => setLat(e.target.value)} 
          />
          <input 
            type="text" 
            placeholder="Longitude" 
            value={lon} 
            onChange={(e) => setLon(e.target.value)} 
          />
          <button type="submit">Get Weather</button>
        </div>
      </form>

      {/* Country Selector */}
      <div className="country-selector">
        <select onChange={handleCountryChange} defaultValue="">
          <option value="" disabled>Select a Country</option>
          {Object.keys(cities).map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

      {/* City Selector */}
      <div className="city-selector">
        <select onChange={handleCityChange} value={selectedCity} disabled={!selectedCountry}>
          <option value="">Select a City</option>
          {selectedCountry && Object.keys(cities[selectedCountry]).map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>
      {weatherData ? (
        <div>
          <h2 className="weather-header">Weather in {weatherData.name}, {weatherData.sys.country}</h2>
          <p className="weather-info">Current Temperature: <span>{kelvinToCelsius(weatherData.main.temp)}°C</span></p>
          <p className="weather-info">Feels Like: <span>{kelvinToCelsius(weatherData.main.feels_like)}°C</span></p>
          <p className="weather-info">Conditions: <span>{weatherData.weather[0].main} ({weatherData.weather[0].description})</span></p>
          <p className="weather-info">Humidity: <span>{weatherData.main.humidity}%</span></p>
          <p className="weather-info">Wind Speed: <span>{weatherData.wind.speed} m/s</span></p>
          <p className="weather-info">Visibility: <span>{weatherData.visibility / 1000} km</span></p>
          <p className="weather-info">Pressure: <span>{weatherData.main.pressure} hPa</span></p>
          <p className="weather-info">Cloudiness: <span>{weatherData.clouds.all}%</span></p>
          <p className="weather-info">Sunrise: <span>{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</span></p>
          <p className="weather-info">Sunset: <span>{new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</span></p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>

    </>
  );
};

export default WeatherPage;
