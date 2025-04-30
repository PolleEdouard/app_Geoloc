import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { MapContainer, TileLayer } from "react-leaflet";
import Building from "./Building";
import "leaflet/dist/leaflet.css";
import { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";
import { transformToGeoJson } from "./transformToGeojson";
import MapFlyTo from "./MapFlyTo"; 
import { cn } from "@/lib/utils";

interface coordinateProps {
  coordinates: { latitude: number; longitude: number } | null;
}
const MapPage: React.FC<coordinateProps> = ({ coordinates }) => {
  const [dataReady, setDataReady] = useState(false);
  const [geojsonData, setGeojsonData] = useState<FeatureCollection<
    Geometry,
    GeoJsonProperties
  > | null>(null);
    // Faire un hook 
    useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/data");
      const geojsonFormatted = transformToGeoJson(res.data);
      setDataReady(true);
      setGeojsonData(geojsonFormatted);
    };
    fetchData();
  }, []);

  return (
    <div className={cn("w-full h-screen")}>
      {dataReady ? (
        <MapContainer
          center={[45.8372, 1.23703]}
          zoom={22}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            // voir pour changer le type de l'image
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {coordinates && <MapFlyTo coordinates={coordinates} />}
          {geojsonData && <Building geojsonData={geojsonData} />}
        </MapContainer>
      ): null}
    </div>
  );
};

export default MapPage;