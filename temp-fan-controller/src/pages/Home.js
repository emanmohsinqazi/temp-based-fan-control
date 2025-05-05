import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="page">
      <h1 className="dashboard-heading">Dashboard</h1>
      <p>Welcome to the Temperature-Based Fan Controller System</p>
      <p>Navigate to chart, prediction, and learn more from the about section.</p>

      <div className="button-container">
        <Link to="/chart">
          <button className="btn-go-to-chart">View Fan Speed Chart</button>
        </Link>

        <Link to="/predict">
          <button className="btn-go-to-prediction">AI based Fan Speed Prediction</button>
        </Link>

        <Link to="/manualpredict">
          <button className="btn-go-to-manualpredict">Cloud based Fan Speed Prediction</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
