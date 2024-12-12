import { ArrowDown, Coins, LocateFixed, MapPin } from "lucide-react";
import React from "react";

const ConfirmRide = ({
  confirmRidePanel,
  setConfirmRidePanel,
  setVehicleFound,
}) => {
  return (
    <div
      className={`fixed w-full z-10 bottom-0 ${
        confirmRidePanel === true ? "translate-y-0" : "translate-y-full"
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
        <img
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt="RideEase Car"
          className="h-24 mb-6"
        />
        <div className="w-full">
          <div className="flex w-full items-center mb-2 gap-4 justify-start p-4 border-2 border-gray-300 hover:shadow-lg active:border-black rounded-lg transition-all">
            <LocateFixed className="text-xl" />
            <div className="flex flex-col">
              <h3 className="font-semibold text-xl">12/2 MS Residency</h3>
              <p className="text-sm text-gray-600">
                3rd B main road, Banglore 511023
              </p>
            </div>
          </div>
          {/* Destination Section */}
          <div className="flex w-full items-center mb-2 gap-4 justify-start p-4 border-2 border-gray-300 hover:shadow-lg active:border-black rounded-lg transition-all">
            <MapPin className="text-xl" />
            <div className="flex flex-col">
              <h3 className="font-semibold text-xl">12/2 MS Residency</h3>
              <p className="text-sm text-gray-600">
                3rd B main road, Banglore 511023
              </p>
            </div>
          </div>
          {/* Payment Section */}
          <div className="flex w-full items-center mb-2 gap-4 justify-start p-4 border-2 border-gray-300 hover:shadow-lg active:border-black rounded-lg transition-all">
            <Coins className="text-xl" />
            <div className="flex flex-col">
              <h3 className="font-semibold text-xl">₹200.9</h3>
              <p className="text-sm text-gray-600">Cash</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setVehicleFound(true);
            setConfirmRidePanel(false);
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