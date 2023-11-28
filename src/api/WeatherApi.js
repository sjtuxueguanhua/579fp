import axios from 'axios';

const OPENWEATHER_API_KEY = '4486282242f23e0a063bc7ca6ccfa84e'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';


export const fetchWeatherData = async (lat=44.34,lon=10.99) => { 
  try {
    const response = await axios.get(`${BASE_URL}?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`);
    console.log('This is fetched here',response)

    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null; 
  }
};
