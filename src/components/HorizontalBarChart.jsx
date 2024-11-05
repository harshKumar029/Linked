import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HorizontalBarChart = ({
  labels, // Data for the x-axis
  datasets, // Array of datasets for multiple bars
  width = '100%', // Default width
  height = '400px', // Default height
  showLegend = false,
  showXAxis = true, // Show x-axis labels
  showYAxis = true, // Show y-axis labels
  FontSize = 10,
}) => {
  const data = {
    labels: labels, // Using labels for y-axis
    datasets: datasets.map((dataset) => ({
      label: dataset.label,
      data: dataset.data,
      backgroundColor: dataset.backgroundColor || 'rgba(75, 192, 192, 0.6)', // Optional background color
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow custom height
    indexAxis: 'y', // Set to horizontal
    scales: {
      x: {
        display: showXAxis,
        beginAtZero: true,
      },
      y: {
        display: showYAxis,
      },
    },
    plugins: {
      legend: {
        display: showLegend,
        labels: {
          font: {
            size: FontSize,
          },
        },
      },
    },
  };

  return (
    <div style={{ width: width, height: height }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default HorizontalBarChart;
