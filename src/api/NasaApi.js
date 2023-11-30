import axios from 'axios';

const NASA_API_KEY = 'ot4mbzwtIPW9eN4oTMPtbxIhIWtU6v2RZNBAC319'; 
const NASA_API_URL = 'https://api.nasa.gov/';

const DONKI_API_URL = 'https://api.nasa.gov/DONKI/';

//APOD API
export const fetchNasaData = async () => {
  try {
    const response = await axios.get(`${NASA_API_URL}planetary/apod?api_key=${NASA_API_KEY}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching NASA data:", error);
    return null;
  }
};


const formatDate = (date) => date.toISOString().split('T')[0];

const get30DaysAgoDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - 30);
  return formatDate(date);
};

export const fetchCMEAnalysis = async () => {
  const startDate = get30DaysAgoDate();
  const endDate = formatDate(new Date());
  const response = await axios.get(`${DONKI_API_URL}CMEAnalysis?startDate=${startDate}&endDate=${endDate}&mostAccurateOnly=true&speed=500&halfAngle=30&catalog=ALL&api_key=${NASA_API_KEY}`);
  return response.data;
};



const NASA_IMAGES_API_URL = 'https://images-api.nasa.gov';

export const fetchNasaMedia = async (searchQuery) => {
  try {
    const response = await axios.get(`${NASA_IMAGES_API_URL}/search`, {
      params: {
        q: searchQuery,
        media_type: 'image,video'
      }
    });
    return response.data.collection.items;
  } catch (error) {
    console.error("Error fetching NASA media:", error);
    return [];
  }
};
