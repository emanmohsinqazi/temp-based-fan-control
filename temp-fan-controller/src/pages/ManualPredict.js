import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './ManualPredict.css'; // Make sure you have a corresponding CSS file for styling

const ManualPredict = () => {
  const [temperature, setTemperature] = useState('');
  const [fanSpeed, setFanSpeed] = useState(null);
  const [data, setData] = useState([]);

  // Load the data once on component mount
  useEffect(() => {
    Papa.parse('/dataaset.csv', {
      download: true,
      header: true,
      complete: (results) => {
        setData(results.data);
      },
    });
  }, []);

  useEffect(() => {
    console.log("Fan Speed State Updated:", fanSpeed); // Log state updates
  }, [fanSpeed]); // This will run whenever `fanSpeed` changes

  const handleTemperatureChange = (e) => {
    setTemperature(e.target.value);
  };

  const handlePredictClick = () => {
    if (temperature) {
      const temp = parseFloat(temperature);
      const matchedData = data.find((row) => {
        const datasetTemp = parseFloat(row.Temperature);
        return Math.abs(datasetTemp - temp) < 0.01; // Allow small floating point tolerance
      });

      console.log("Matched Data:", matchedData); // Log matched data

      if (matchedData) {
        setFanSpeed(matchedData['FanSpeed']); // Update fanSpeed with the corresponding value
      } else {
        setFanSpeed('No exact match found, try a different temperature.');
      }
    } else {
      setFanSpeed('Please enter a valid temperature.');
    }
  };

  return (
    <div className="manual-predict-container">
      <h1>Manual Fan Speed Prediction</h1>
      <p>Enter the temperature manually to get the corresponding fan speed:</p>
      
      <div className="input-container">
        <input
          type="number"
          value={temperature}
          onChange={handleTemperatureChange}
          placeholder="Enter temperature in °C"
        />
        <button onClick={handlePredictClick} className="btn-predict">
          Get Fan Speed
        </button>
      </div>

      {/* Display fanSpeed result in a box if it's not null */}
      {fanSpeed !== null && (
        <div className="result-box">
          <p>Fan Speed: {fanSpeed}</p>
        </div>
      )}
    </div>
  );
};

export default ManualPredict;
