import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface MapFlyToProps {
  coordinates: { latitude: number; longitude: number } | null;
}

const MapFlyTo: React.FC<MapFlyToProps> = ({ coordinates }) => {
  const map = useMap();

  useEffect(() => {
    if (coordinates) {
      console.log("coordinates", coordinates);
      map.flyTo([coordinates.latitude, coordinates.longitude], 18, {
        animate: true,
        duration: 1.5,
        easeLinearity: 0.25,
      });
    }
  }, [coordinates, map]);
  console.log("flyTo")
  return null;
};

export default MapFlyTo;