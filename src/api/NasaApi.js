import axios from 'axios';

const NASA_API_KEY = '';
const NASA_API_URL = 'https://api.nasa.gov/';

export const fetchNasaData = async () => {
  const response = await axios.get(`${NASA_API_URL}planetary/apod?api_key=${NASA_API_KEY}`);
  return response.data;
};
