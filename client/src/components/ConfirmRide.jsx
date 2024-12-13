import { ArrowDown, Coins, LocateFixed, MapPin } from "lucide-react";
import React from "react";

const ConfirmRide = ({
  confirmRidePanel,
  setConfirmRidePanel,
  setVehicleFound,
  createRide,
  vehicle,
  pickup,
  destination,
  fare,
}) => {
  return (
    <div
      className={`fixed w-full z-10 bottom-0 ${
        confirmRidePanel ? "translate-y-0" : "translate-y-full"
      } bg-white p-5 transition-all duration-500 overflow-hidden md:max-w-[50%] mx-auto rounded-t-lg shadow-lg`}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-3xl">Confirm your ride</h3>
        <ArrowDown
          className="cursor-pointer text-xl"
          onClick={() => setConfirmRidePanel(false)}
        />
      </div>

      <div className="flex gap-4 flex-col items-center justify-center">
        <img src={vehicle.image} alt="RideEase Car" className="h-24 mb-6" />
        <div className="w-full">
          {/* Pickup Section */}
          <div className="flex w-full items-center mb-2 gap-4 justify-start p-4 border-b-2 border-gray-300 ">
            <LocateFixed className="text-xl text-green-600" />
            <div className="flex flex-col">
              <h3 className="font-normal text-xl text-gray-800">{pickup}</h3>
            </div>
          </div>
          {/* Destination Section */}
          <div className="flex w-full items-center mb-2 gap-4 justify-start p-4 border-b-2 border-gray-300 ">
            <MapPin className="text-xl text-blue-600" />
            <div className="flex flex-col">
              <h3 className="font-normal text-xl text-gray-800">
                {destination}
              </h3>
            </div>
          </div>
          {/* Payment Section */}
          <div className="flex w-full items-center mb-2 gap-4 justify-start p-4 border-b-2 border-gray-300 ">
            <Coins className="text-xl text-yellow-500" />
            <div className="flex flex-col">
              <h3 className="font-semibold text-xl text-gray-800">
                ₹{fare[vehicle.type]}
              </h3>
              <p className="text-sm text-gray-600">Cash</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setVehicleFound(true);
            setConfirmRidePanel(false);
            createRide();
          }}
          className="w-full bg-green-600 text-white font-semibold p-3 rounded-lg cursor-pointer hover:bg-green-700 transition-all"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
