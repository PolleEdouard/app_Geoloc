// services/Api.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import { transformToGeoJson } from "@/components/map/transformToGeojson";
import { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";

const useGeojsonData = () => {
  const [geojsonData, setGeojsonData] = useState<FeatureCollection<Geometry, GeoJsonProperties> | null>(null);
  const [dataReady, setDataReady] = useState(false);
  const [rawData, setRawData] = useState<any[]>([]); 

  const loadData = async () => {
    try {
      const res = await axios.get("/api/data");
      const formatted = transformToGeoJson(res.data);
      setGeojsonData(formatted);
      setRawData(res.data); 
      setDataReady(true);
    } catch (error) {
      console.error("Erreur lors du chargement des données GeoJSON :", error);
      setDataReady(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return { geojsonData, dataReady, rawData };
};

export default useGeojsonData;
