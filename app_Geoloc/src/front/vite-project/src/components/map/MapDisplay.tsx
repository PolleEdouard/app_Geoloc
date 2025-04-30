import React, { useState } from "react";
import BuildingFinder from "./BuildingFinder";
import MapPage from "./MapPage"; 

const MapDisplay: React.FC = () => {
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);

  const handleCoordinatesUpdate = (coords: { latitude: number; longitude: number }) => {
    setCoordinates(coords);
  };

  return (
    <div>
      <BuildingFinder onCoordinatesUpdate={handleCoordinatesUpdate} />
      <MapPage coordinates={coordinates} />
    </div>
  );
};

export default MapDisplay;
