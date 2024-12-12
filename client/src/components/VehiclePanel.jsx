import { User, ArrowDown } from "lucide-react";
import React from "react";

const VehiclePanle = ({
  setVehiclePanel,
  vehiclePanel,
  setConfirmRidePanel,
}) => {
  const partners = [
    {
      image: "https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png",
      text: "RideEase Car",
    },
    {
      image:
        "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
      text: "RideEase Bike",
    },
    {
      image:
        "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png",
      text: "RideEase Auto",
    },
  ];

  return (
    <div
      className={`fixed w-full z-10 bottom-0 ${
        vehiclePanel === true ? "translate-y-0" : "translate-y-full"
      } bg-white p-5 transition-all duration-500 overflow-hidden md:max-w-[50%] mx-auto rounded-t-lg shadow-xl`}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-3xl font-semibold mb-6">Choose a Vehicle</h3>
        <ArrowDown
          className="cursor-pointer text-xl"
          onClick={() => setVehiclePanel(false)}
        />
      </div>
      {partners.map((partner, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              setConfirmRidePanel(true);
              setVehiclePanel(false);
            }}
            className="flex w-full items-center mb-3 justify-between p-4 border-2 border-gray-300 hover:shadow-lg active:border-black rounded-lg cursor-pointer transition-all"
          >
            <img src={partner.image} alt="" className="h-16 rounded-lg" />
            <div className="w-2/3 pl-4">
              <h4 className="flex text-lg font-medium items-center gap-2">
                {partner.text} <User className="w-5" />
              </h4>
              <p className="font-medium text-sm text-gray-700">2 mins away</p>
              <p className="font-normal text-xs text-gray-600">
                Affordable, compact rides
              </p>
            </div>
            <p className="text-xl font-semibold">₹223.9</p>
          </div>
        );
      })}
    </div>
  );
};

export default VehiclePanle;
