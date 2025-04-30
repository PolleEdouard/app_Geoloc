// BuildingFinder.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import useGeojsonData from "@/services/Api"; 

interface Building {
  id: number;
  name: string;
  altName: string;
  latitude: number;
  longitude: number;
}

interface BuildingFinderProps {
  onCoordinatesUpdate: (coords: {
    latitude: number;
    longitude: number;
  }) => void;
}

const BuildingFinder: React.FC<BuildingFinderProps> = ({ onCoordinatesUpdate }) => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Building[]>([]);
  const { rawData } = useGeojsonData(); 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 1 && rawData) {
      const filteredSuggestions = rawData.filter((item: any) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (batiment: Building) => {
    setQuery(batiment.name);
    setSuggestions([]);
    onCoordinatesUpdate({
      latitude: batiment.latitude,
      longitude: batiment.longitude,
    });
  };

  const handleSearchClick = () => {
    if (suggestions.length > 0) {
      handleSuggestionClick(suggestions[0]);
    } else if (rawData) {
      const matchedBuilding = rawData.find((item: any) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      if (matchedBuilding) {
        handleSuggestionClick(matchedBuilding);
      } else {
        alert("Aucun bâtiment trouvé.");
      }
    }
  };

  return (
    <div className="relative max-w-md mx-auto mt-4 m-5">
      <div className="flex items-center border border-gray-300 rounded-md shadow-sm px-3 py-2 bg-white">
        <Search className="w-5 h-5 text-gray-500 mr-2" />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Rechercher un bâtiment..."
          className="flex-grow outline-none bg-transparent text-sm"
        />
        <Button size="sm" className="ml-2" onClick={handleSearchClick}>
          Rechercher
        </Button>
      </div>
      {suggestions.length > 0 && (
        <ul className="relative z-10 bg-white border border-gray-300 rounded-md shadow-lg mt-1 w-full max-h-60 overflow-y-auto">
          {suggestions.map((bat) => (
            <li
              key={bat.id}
              className="p-2 text-sm hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSuggestionClick(bat)}
            >
              {bat.name} {bat.altName ? `(${bat.altName})` : ""}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BuildingFinder;
