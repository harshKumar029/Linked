import React, { memo, useEffect, useState } from 'react';
import DottedMap from 'dotted-map';

const DotMap = ({ pins, mapOptions }) => {
  const [svgMap, setSvgMap] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Initialize the map with dynamic options
      const map = new DottedMap({
        height: mapOptions?.height || 60,
        grid: mapOptions?.grid || 'diagonal',
      });

      // Add pins dynamically
      pins.forEach((pin) => {
        map.addPin({
          lat: pin.lat,
          lng: pin.lng,
          svgOptions: pin.svgOptions || { color: '#000', radius: 0.5 },
        });
      });

      // Generate the SVG dynamically
      const svg = map.getSVG({
        radius: mapOptions?.radius || 0.2,
        color: mapOptions?.color || '#000',
        shape: mapOptions?.shape || 'hexagon',
        backgroundColor: mapOptions?.backgroundColor || '#F4F6FA',
      });

      setSvgMap(svg);
    }, 500); // Debounce rendering

    return () => clearTimeout(timer);
  }, [pins, mapOptions]);

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

export default memo(DotMap);
