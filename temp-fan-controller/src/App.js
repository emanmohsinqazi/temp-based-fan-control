// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Assuming Navbar component is present
import Home from './pages/Home';
import Chart from './pages/Chart';
import About from './pages/About';
import Predict from './pages/Predict';
import ManualPredict from './pages/ManualPredict'; // Import the ManualPredict component

function App() {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chart" element={<Chart />} />
          <Route path="/about" element={<About />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/manualpredict" element={<ManualPredict />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
