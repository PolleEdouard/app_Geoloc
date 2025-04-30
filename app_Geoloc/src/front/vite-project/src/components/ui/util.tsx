import { FeatureCollection } from "geojson";
import { Popup, Marker } from "react-leaflet";

interface MapPopupProps {
  position: [number, number];
  text: string;
}

export const MapPopup: React.FC<MapPopupProps> = ({ position, text }) => {
  return (
    <Marker position={position}>
      <Popup>{text}</Popup>
    </Marker>
  );
};

// Polygone autour de Paris
export const polygonCoords: [number, number][] = [
    [48.86, 2.35],
    [48.85, 2.3],
    [48.87, 2.28],
    [48.89, 2.33],
  ];

export const polygonCoords2: [number, number][] = [
    [49.86, 2.45],
    [49.85, 2.4],
    [49.87, 2.38],
    [49.89, 2.43],
  ];
  
  
export const geoJsonCollection: FeatureCollection = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [2.3522, 48.8566],
        },
        properties: { name: "Point 1" },
      },
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [2.35, 48.85],
              [2.36, 48.85],
              [2.36, 48.86],
              [2.35, 48.86],
              [2.35, 48.85],
            ],
          ],
        },
        properties: { name: "Zone" },
      },
    ],
  };
