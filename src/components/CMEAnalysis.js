import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { fetchCMEAnalysis } from '../api/NasaApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CMEAnalysis.css'; 

const CMEAnalysis = () => {
  const [cmeAnalysisData, setCmeAnalysisData] = useState([]);

  useEffect(() => {
    const getCMEData = async () => {
      const data = await fetchCMEAnalysis();
      setCmeAnalysisData(data);
    };

    getCMEData();
  }, []);

  const cardVariants = ['Primary', 'Secondary', 'Success', 'Danger', 'Warning', 'Info', 'Light', 'Dark'];
  const borderVariants = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'];

  return (
    <div className="cme-analysis-container">
      <h1 className="cme-header">NASA Coronal Mass Ejection (CME) Analysis</h1>
      <div className="cme-introduction">
        <p>
        The sun is constantly emitting streams of charged particles, known as the solar wind, that interact with the Earth's magnetic field and atmosphere. Sometimes, the sun also releases huge bursts of plasma and magnetic field, called coronal mass ejections (CMEs), that can travel across the solar system and affect planets and spacecraft along their way. In this page, you will learn more about what CMEs are, how they form, how they impact human life and technology, and how NASA monitors and analyzes them using data from various sources.
        </p>
        <p>
          CMEs impact Earth and other planets in our solar system, leading to geomagnetic storms that can disrupt satellite operations, telecommunications, navigation systems, and even power grids.
          Here is CME Analysis of recent 30 days from NASA.
        </p>
      </div>
      <Row xs={1} md={5} className="g-4 card-row">
        {cmeAnalysisData.length > 0 ? (
          cmeAnalysisData.map((cme, index) => (
            <Col key={index}>
              <Card
                bg={cardVariants[index % cardVariants.length].toLowerCase()}
                border={borderVariants[index % borderVariants.length]}
                text={cardVariants[index % cardVariants.length].toLowerCase() === 'light' ? 'dark' : 'white'}
                style={{ width: '18rem', marginBottom: '1rem' }}
              >
                <Card.Body>
                  <Card.Title>CME Analysis Data</Card.Title>
                  <Card.Text>
                    <p>Time: {cme.time21_5}</p>
                    <p>Latitude: {cme.latitude}</p>
                    <p>Longitude: {cme.longitude}</p>
                    <p>Half Angle: {cme.halfAngle}</p>
                    <p>Speed: {cme.speed}</p>
                    <p>Type: {cme.type}</p>
                    <p>Most Accurate: {cme.isMostAccurate ? 'Yes' : 'No'}</p>
                    <p>Associated CME ID: {cme.associatedCMEID}</p>
                    <p>Note: {cme.note}</p>
                    <p>Catalog: {cme.catalog}</p>
                    <a href={cme.link} target="_blank" rel="noopener noreferrer">View More</a>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No CME Analysis Data Available</p>
        )}
      </Row>
    </div>
  );
};

export default CMEAnalysis;
