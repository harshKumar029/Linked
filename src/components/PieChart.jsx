import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register required elements with Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, labels, backgroundColors }) => {
  // Set up data for the Pie Chart using props
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };

  // Set up optional chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw;
            const percentage = ((value / data.reduce((a, b) => a + b, 0)) * 100).toFixed(2);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="pie-chart-container" style={{ width: '100%', maxWidth: '400px' }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
