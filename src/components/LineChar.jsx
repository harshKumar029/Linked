import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const LineChart = () => {
  // Sample data for the line chart
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        data: [30, 45, 28, 50, 35, 55, 40],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
        tension: 0.4, // Smoothes out the line
      },
    ],
  };

  // Optional configuration options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333', // Set legend text color
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#333', // Set x-axis text color
        },
      },
      y: {
        ticks: {
          color: '#333', // Set y-axis text color
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div >
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
