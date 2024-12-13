import { MapPin } from "lucide-react";
import React from "react";

const LocationSearchPanel = ({
  setPanelOpen,
  setVehiclePanel,
  suggestions,
  setPickup,
  setDestination,
  activeField,
}) => {
  const handleSuggestionClick = (element) => {
    if (activeField === "pickup") setPickup(element);
    else setDestination(element);
  };

  return (
    <div className="p-2">
      {suggestions.map((location, index) => (
        <div
          key={index}
          className="flex gap-3 items-center py-3 px-4 text-lg font-normal border-b-2 border-gray-200 cursor-pointer"
          onClick={() => handleSuggestionClick(location)}
        >
          <MapPin className="w-6 text-blue-600" />
          <h4 className="truncate text-gray-800">{location}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
