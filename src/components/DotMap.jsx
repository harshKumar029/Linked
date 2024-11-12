import React, { useEffect, useState } from 'react';
import DottedMap from 'dotted-map'; 

const DotMap = () => {
  const [svgMap, setSvgMap] = useState(null);

  useEffect(() => {
    const map = new DottedMap({
      height: 60,
    //   width: 110,
      grid: 'diagonal', 
    });

    map.addPin({
      lat: 40.73061,  // New York
      lng: -73.935242,
      svgOptions: { color: '#d6ff79', radius: 0.4 }, // Pin options
    });
    map.addPin({
      lat: 48.8534,  //Paris
      lng: 2.3488, 
      svgOptions: { color: '#acdcf8', radius: 0.5 },
    });

    // representation of the map
    const svg = map.getSVG({
      radius: 0.2,
      color: '#413aa1',
      shape: 'hexagon', 
      backgroundColor: '#F4F6FA', 
    });

    setSvgMap(svg); 
  }, []);

  if (!svgMap) {
    return <div>Loading map...</div>;
  }

  return (
    <div>
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        alt="Map"
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  );
};

export default DotMap;
