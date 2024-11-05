import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, CategoryScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LinearScale, CategoryScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({
  xAxisData, 
  datasets, 
  showXAxis = true, 
  showYAxis = true, 
  width = '100%', 
  height = '400px', 
  showLegend = false,
  PointStyle = false,
  PointerboxWidth = 6,
  PointerboxHeight = 4,
  FontSize = 10,
}) => {
  const data = {
    labels: xAxisData, 
    datasets: datasets.map((dataset) => ({
      label: dataset.label,
      data: dataset.data,
      borderColor: dataset.borderColor, 
      backgroundColor: dataset.backgroundColor || 'rgba(0,0,0,0)',
      fill: false, 
      tension: dataset.tension,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: showXAxis,
        type: 'category', 
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
          usePointStyle: PointStyle,
          boxWidth: PointerboxWidth,
          boxHeight: PointerboxHeight,
          font: {
            size: FontSize,
          },
        },
      },
    },
  };

  return (
    <div style={{ width: width, height: height }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
