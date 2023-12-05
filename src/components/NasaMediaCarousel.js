import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { fetchNasaMedia } from '../api/NasaApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ImageCarousel.css'; 

const NasaMediaCarousel = () => {
  const [mediaData, setMediaData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('apollo 11'); // Default search query

  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery) {
        const data = await fetchNasaMedia(searchQuery);
        setMediaData(data);
      }
    };

    fetchData();
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    const input = event.target.value;
    // Check if the input is a string and sanitize it
    if (typeof input === 'string') {
      const sanitizedInput = input.trim(); // Trim whitespace
      setSearchQuery(sanitizedInput);
    }
  };

  return (
    <>
      <div className="image-carousel-container">
        <h2>What pictures are you interested in from NASA? Search Now!</h2>
        <input
          className="image-search-input"
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Enter search term"
        />
        <Carousel>
          {mediaData.length > 0 ? (
            mediaData.map((media, index) => (
              <Carousel.Item key={index}>
                {media.links && <img className="full-page-image" src={media.links[0].href} alt={media.data[0].title} />}
                <Carousel.Caption>
                  <h3>{media.data[0].title}</h3>
                  <p>{media.data[0].description}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))
          ) : (
            <p className="no-data-message">No data available. Try a different search term.</p>
          )}
        </Carousel>
      </div>
    </>
  );
};

export default NasaMediaCarousel;
