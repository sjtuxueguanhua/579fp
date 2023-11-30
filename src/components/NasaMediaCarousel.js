import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { fetchNasaMedia } from '../api/NasaApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ImageCarousel.css'; 

const NasaMediaCarousel = () => {
  const [mediaData, setMediaData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('apollo 11'); // Default search query

  useEffect(() => {
    if (searchQuery) {
      fetchNasaMedia(searchQuery).then(data => setMediaData(data));
    }
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <div className="image-carousel-container">
        <h2>What are you interested in NASA? Search Now!</h2>
        <input
          className="image-search-input"
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Enter search term"
        />
        <Carousel>
          {mediaData.map((media, index) => (
            <Carousel.Item key={index}>
              {media.links && <img className="full-page-image" src={media.links[0].href} alt={media.data[0].title} />}
              <Carousel.Caption>
                <h3>{media.data[0].title}</h3>
                <p>{media.data[0].description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default NasaMediaCarousel;
