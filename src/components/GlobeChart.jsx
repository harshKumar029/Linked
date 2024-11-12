import React, { useEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

const GlobeChart = ({ data, pointColor = '#FF5722' }) => {
  useEffect(() => {
    // Apply amCharts theme
    am4core.useTheme(am4themes_animated);

    // Create chart instance
    const chart = am4core.create('chartdiv', am4maps.MapChart);

    if (chart) {
      // Set geodata and projection
      chart.geodata = am4geodata_worldLow;
      chart.projection = new am4maps.projections.Orthographic();
      chart.panBehavior = 'rotateLongLat';

      // Set ocean color
      chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color('#E3F2FD'); // Light blue color for ocean
      chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;

      // Add polygon series (for the map outline)
      const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
      polygonSeries.useGeodata = true;

      const polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.fill = am4core.color('#BBDEFB'); // Light blue-gray for countries
      polygonTemplate.stroke = am4core.color('#0D47A1'); // Dark blue stroke for better contrast
      polygonTemplate.strokeWidth = 0.7;

      // Add hover state for countries
      const hoverState = polygonTemplate.states.create('hover');
      hoverState.properties.fill = am4core.color('#64B5F6'); // Medium blue on hover

      // Add image series for points
      const imageSeries = chart.series.push(new am4maps.MapImageSeries());
      const imageTemplate = imageSeries.mapImages.template;

      // Set the default appearance of the points based on the color prop
      imageTemplate.propertyFields.latitude = 'latitude';
      imageTemplate.propertyFields.longitude = 'longitude';
      const circle = imageTemplate.createChild(am4core.Circle);
      circle.radius = 6;
      circle.fill = am4core.color(pointColor);  // Use the color passed in as prop (Default: #FF5722)
      circle.stroke = am4core.color('#0D47A1');  // Dark blue border
      circle.strokeWidth = 2;

      // Use the data prop for the points' latitude, longitude, and title
      imageSeries.data = data;

      // Add tooltips for points
      imageTemplate.tooltipText = '{title}';
    }

    // Cleanup function to dispose chart
    return () => {
      if (chart) {
        chart.dispose();
      }
    };
  }, [data, pointColor]);  // Re-run effect if data or color changes

  return <div id="chartdiv" style={{ width: '100%', height: '520px' }}></div>;
};

export default GlobeChart;
