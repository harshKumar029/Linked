// import React from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// // Register the required components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const BarChart = ({
//   labels, // Data for the x-axis
//   datasets, // Array of datasets for multiple bars
//   width = '100%', // Default width
//   height = '400px', // Default height
//   showLegend = false,
//   showXAxis = true, // Show x-axis labels
//   showYAxis = true, // Show y-axis labels
//   FontSize = 10,
// }) => {
//   const data = {
//     labels: labels, // Using labels for x-axis
//     datasets: datasets.map((dataset) => ({
//       label: dataset.label,
//       data: dataset.data,
//       backgroundColor: dataset.backgroundColor || 'rgba(75, 192, 192, 0.6)', // Optional background color
//     })),
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false, // Allow custom height
//     scales: {
//       x: {
//         display: showXAxis,
//         beginAtZero: true,
//       },
//       y: {
//         display: showYAxis,
//         beginAtZero: true,
//       },
//     },
//     plugins: {
//       legend: {
//         display: showLegend,
//         labels: {
//           font: {
//             size: FontSize,
//           },
//         },
//       },
//     },
//   };

//   return (
//     <div style={{ width: width, height: height }}>
//       <Bar data={data} options={options} />
//     </div>
//   );
// };

// export default BarChart;

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({
  labels, 
  datasets, 
  width = '100%',
  height = '400px',
  showLegend = false,
  showXAxis = true, 
  showYAxis = true, 
  FontSize = 10,
  highlightColor = 'rgba(255, 0, 0, 0.8)' 
}) => {
  // Function to find the max value in the dataset
  const getMaxValue = (data) => Math.max(...data);

  const data = {
    labels: labels, 
    datasets: datasets.map((dataset) => {
      const maxValue = getMaxValue(dataset.data);

      return {
        ...dataset,
        backgroundColor: dataset.data.map(value =>
          value === maxValue ? highlightColor : (dataset.backgroundColor || 'rgba(75, 192, 192, 0.6)')
        )
      };
    })
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: showXAxis,
        beginAtZero: true,
      },
      y: {
        display: showYAxis,
        beginAtZero: true,
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

export default BarChart;

