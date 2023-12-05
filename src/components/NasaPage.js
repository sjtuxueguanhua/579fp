import React, { useState, useEffect } from 'react';
import { fetchNasaData } from '../api/NasaApi';

import 'bootstrap/dist/css/bootstrap.min.css';
import './NasaPage.css'; 

const NasaPage = () => {
  const [nasaData, setNasaData] = useState(null);



  useEffect(() => {
    const getNasaData = async () => {
      const data = await fetchNasaData();
      setNasaData(data);

    };

    getNasaData();
  }, []);



  return (
    
    <div className="nasa-page-container">
      {nasaData ? (
        
        <div>
          <h1 className="nasa-page-header">Today's Astronomy Picture</h1>
          <h2>{nasaData.title}</h2>
          <img src={nasaData.url} alt={nasaData.title} className="nasa-image" />
          <p className="nasa-text">{nasaData.explanation}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}



    </div>

    
  );
};

export default NasaPage;
