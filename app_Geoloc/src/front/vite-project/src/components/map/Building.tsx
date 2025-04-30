import L from "leaflet";
import { useMap } from "react-leaflet";
import { useEffect } from "react";
import { FeatureCollection } from "geojson";

type BuildingProps = {
  geojsonData: FeatureCollection;
};

const Building = ({ geojsonData }: BuildingProps) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !geojsonData?.features) return;

    const filteredBuildings: FeatureCollection = {
      ...geojsonData,
      features: geojsonData.features.filter(
        (feature) =>
          feature.properties?.name || feature.properties?.alt_name
      ),
    };

    const BuildingGeoJson = new L.GeoJSON(filteredBuildings, {
      onEachFeature: (feature, layer) => {
        const { properties = {} } = feature;
        const { name, alt_name } = properties;
        layer.bindPopup(`<p>${name || alt_name}</p>`);
        
      },
    });
    console.log("Pop up chargé !");
    BuildingGeoJson.addTo(map);
// on retire la couche pour eviter l'empilement 
    return () => {
      map.removeLayer(BuildingGeoJson);
    };
  }, [map, geojsonData]);
// retourne rien car n'agit pas dans le DOM directement agis comme un controleur 
  return null;
};

export default Building;
