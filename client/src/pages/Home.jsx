import React, { useState } from "react";
import { ArrowDown } from "lucide-react";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanle from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  const changeHandler = (e) => {
    console.log(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full flex justify-center overflow-hidden bg-gray-100">
      <div className="w-full md:max-w-[50%] relative">
        <h1 className="text-3xl absolute left-6 top-6 font-extrabold text-gray-900">
          RideEase
        </h1>
        <div className="h-screen w-full">
          <img
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
            alt="Background"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute h-screen top-0 w-full flex flex-col justify-end">
          <div className="h-[30%] bg-white p-6 relative rounded-t-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-semibold text-gray-800">
                Find a trip
              </h4>
              {panelOpen && (
                <ArrowDown
                  className="cursor-pointer text-gray-600 hover:text-gray-800"
                  onClick={() => setPanelOpen(false)}
                />
              )}
            </div>
            <form className="space-y-4" onSubmit={submitHandler}>
              <div className="line h-16 w-1 bg-gray-800 absolute top-[44%] left-10 rounded"></div>
              <input
                type="text"
                onClick={() => setPanelOpen(true)}
                value={pickup}
                onChange={changeHandler}
                placeholder="Add a pickup location"
                className="w-full py-3 px-4 pl-8 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                onClick={() => setPanelOpen(true)}
                value={destination}
                onChange={changeHandler}
                placeholder="Enter your destination"
                className="w-full py-3 px-4 pl-8 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </form>
          </div>
          <div
            className={`${
              panelOpen ? "h-[70%]" : "h-0"
            } bg-white transition-all duration-500 overflow-hidden rounded-t-lg shadow-md`}
          >
            <LocationSearchPanel
              setPanelOpen={setPanelOpen}
              setVehiclePanel={setVehiclePanel}
            />
          </div>
        </div>
      </div>
      <VehiclePanle
        setVehiclePanel={setVehiclePanel}
        vehiclePanel={vehiclePanel}
        setConfirmRidePanel={setConfirmRidePanel}
      />
      <ConfirmRide
        confirmRidePanel={confirmRidePanel}
        setConfirmRidePanel={setConfirmRidePanel}
        setVehicleFound={setVehicleFound}
      />
      <LookingForDriver
        vehicleFound={vehicleFound}
        setVehicleFound={setVehicleFound}
      />
      <WaitingForDriver
        waitingForDriver={waitingForDriver}
        setWaitingForDriver={setWaitingForDriver}
      />
    </div>
  );
};

export default Home;
