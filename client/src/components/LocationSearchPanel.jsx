import { MapPin } from "lucide-react";
import React from "react";

const LocationSearchPanel = ({ setPanelOpen, setVehiclePanel }) => {
  const locations = [
    "12/2 MS Residency, 3rd B Main Road , Banglore 511045",
    "12/2 MS Residency, 3rd B Main Road , Banglore 511045",
    "12/2 MS Residency, 3rd B Main Road , Banglore 511045",
    "12/2 MS Residency, 3rd B Main Road , Banglore 511045",
  ];
  return (
    <div>
      {locations.map((location, index) => {
        return (
          <div
            key={index}
            className="flex gap-3 items-center justify-start py-3 px-5 text-lg font-semibold border-2 border-gray-200 hover:bg-gray-100 active:border-black rounded my-3 cursor-pointer transition-all mx-1"
            onClick={() => {
              setVehiclePanel(true);
              setPanelOpen(false);
            }}
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
