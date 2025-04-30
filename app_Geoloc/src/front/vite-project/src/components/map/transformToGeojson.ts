import { FeatureCollection, Point, GeoJsonProperties } from "geojson";

export const transformToGeoJson = (data: any[]): FeatureCollection<Point, GeoJsonProperties> => {
  return {
    type: "FeatureCollection",
    features: data.map(item => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [item.longitude, item.latitude],
      },
      properties: {
        id: item.id,
        name: item.name,
        alt_name: item.altName,
        osm_id: item.osm_id,
        nodes: item.nodes,
      }
    })),
  };
};
