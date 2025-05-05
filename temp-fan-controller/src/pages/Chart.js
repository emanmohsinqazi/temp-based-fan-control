// src/pages/Chart.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Papa from 'papaparse';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Chart.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart = () => {
  const [tempChartData, setTempChartData] = useState(null);
  const [histogramData, setHistogramData] = useState(null);

  useEffect(() => {
    Papa.parse('/dataaset.csv', {
      download: true,
      header: true,
      complete: (results) => {
        const temperatures = [];
        const fanSpeeds = [];

        // Parse the data and store the temperature and fan speed values
        results.data.forEach((row) => {
          const temp = parseFloat(row.Temperature);
          const speed = parseFloat(row.FanSpeed);

          if (!isNaN(temp) && !isNaN(speed)) {
            temperatures.push(temp);
            fanSpeeds.push(speed);
          }
        });

        // Chart: Temperature vs Fan Speed
        setTempChartData({
          labels: temperatures.map((t) => `${t}°C`),
          datasets: [
            {
              label: 'Fan Speed (RPM)',
              data: fanSpeeds,
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
              borderRadius: 6,
            },
          ],
        });

        // Histogram: Fan Speed Distribution
        const bins = [0, 0, 0, 0, 0, 0]; // Create 6 bins for ranges: 0–20, 21–40, ..., 101+
        fanSpeeds.forEach((speed) => {
          const idx = Math.min(Math.floor(speed / 20), 5); // Ensure no bin exceeds index 5
          bins[idx]++;
        });

        setHistogramData({
          labels: ['0–20', '21–40', '41–60', '61–80', '81–100', '101+'],
          datasets: [
            {
              label: 'Fan Speed Distribution',
              data: bins,
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
              borderRadius: 6,
            },
          ],
        });
      },
    });
  }, []);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Temperature vs Fan Speed',
        font: { size: 20 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Fan Speed (RPM)' },
      },
      x: {
        title: { display: true, text: 'Temperature (°C)' },
      },
    },
  };

  const histogramOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Fan Speed Distribution Histogram',
        font: { size: 20 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Frequency' },
      },
      x: {
        title: { display: true, text: 'Fan Speed Range (RPM)' },
      },
    },
  };

  return (
    <div className="chart-page">
      <h1 className="chart-heading">Charts Dashboard</h1>

      <div className="chart-container">
        {tempChartData ? (
          <Bar data={tempChartData} options={chartOptions} />
        ) : (
          <p>Loading Temperature vs Fan Speed chart...</p>
        )}
      </div>

      <div className="chart-container" style={{ marginTop: '40px' }}>
        {histogramData ? (
          <Bar data={histogramData} options={histogramOptions} />
        ) : (
          <p>Loading Fan Speed Histogram...</p>
        )}
      </div>
    </div>
  );
};

export default Chart;
