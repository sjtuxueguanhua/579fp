// import logo from './logo.svg';
//$env:NODE_OPTIONS = "--openssl-legacy-provider"
import NasaMediaCarousel from './components/NasaMediaCarousel';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import WeatherPage from './components/WeatherPage';
import NasaPage from './components/NasaPage';
import NavbarComponent from './components/NavbarComponent';
import CMEAnalysis from './components/CMEAnalysis';
function App() {
  return (

    <Router>
    <NavbarComponent />
    <Routes>
        <Route path="/" element={<WeatherPage />} />
        <Route path="/nasa" element={<NasaPage />} />
        <Route path="/nasaData" element={<CMEAnalysis />} />
        
        <Route path="/media" element={<NasaMediaCarousel />} />
      </Routes>
  </Router>

  // <>
  // <h1>Hey there! Pop in your location and let's see if it's a good night for stargazing.</h1>

  //   <WeatherPage/>
  // <h1> Astronomy Picture of the Day</h1>
  //   <NasaPage/>
  //   <div>
  //     <h1>NASA Media</h1>
  //     <NasaMediaCarousel />
  //   </div>
  //   </>
  );
}
export default App;
