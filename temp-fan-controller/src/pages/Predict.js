// src/pages/Predict.js
import React, { useState } from 'react';
import axios from 'axios';
import './Predict.css';

const Predict = () => {
  const [temp, setTemp] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use GET method to pass temperature as query parameter
      const res = await axios.get(`http://localhost:5000/predict?temperature=${temp}`);
      // Round the predicted fan speed to remove decimal points
      setResult(Math.round(res.data.predicted_fan_speed)); // Handle the predicted fan speed response
    } catch (error) {
      console.error('Error fetching prediction:', error);
      alert('Error predicting fan speed');
    }
  };

  return (
    <div className="page">
      <h1>Predict Fan Speed</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Enter Temperature"
          value={temp}
          onChange={(e) => setTemp(e.target.value)}
          required
        />
        <button type="submit">Predict</button>
      </form>
      {result !== null && <h2>Predicted Speed: {result} RPM</h2>}
    </div>
  );
};

export default Predict;
