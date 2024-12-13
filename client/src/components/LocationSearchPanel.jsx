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
    if (activeField == "pickup") setPickup(element);
    else setDestination(element);

    // setVehiclePanel(true);
    // setPanelOpen(false);
  };

  return (
    <div>
      {suggestions.map((location, index) => {
        return (
          <div
            key={index}
            className="flex gap-3 items-center justify-start py-3 px-5 text-lg font-semibold border-2 border-gray-100 hover:bg-gray-100 active:border-black rounded m-1 cursor-pointer"
            onClick={() => handleSuggestionClick(location)}
          >
            <MapPin className="w-8" />
            <h4 className="truncate">{location}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
