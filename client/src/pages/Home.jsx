import React, { useContext, useEffect, useState } from "react";
import { ArrowDown, User } from "lucide-react";
import axios from "axios";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanle from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicle, setVehicle] = useState({ type: "", image: "" });
  const [ride, setRide] = useState(null);

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  const navigate = useNavigate();
  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id });
  }, [user]);

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationSuggestions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const findTripFare = async () => {
    setVehiclePanel(true);
    setPanelOpen(false);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/rides/get-fare`,
        {
          params: { pickup, destination },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setFare(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createRide = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/rides/create`,
      {
        pickup,
        destination,
        vehicleType: vehicle.type,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  };

  socket.on("ride-confirm", (data) => {
    setRide(data);
    setWaitingForDriver(true);
    setVehicleFound(false);
  });

  socket.on("ride-started", (ride) => {
    setWaitingForDriver(false);
    navigate("/riding", { state: { ride } });
  });

  return (
    <div className="w-full flex justify-center overflow-hidden bg-gray-100">
      <div className="w-full md:max-w-[50%] relative">
        <h1 className="text-3xl absolute left-6 top-6 font-normal text-gray-900">
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
          <div className="h-[35%] bg-white p-6 relative rounded-t-lg shadow-md">
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
              <input
                type="text"
                onClick={() => {
                  setPanelOpen(true);
                  setActiveField("pickup");
                }}
                value={pickup}
                onChange={handlePickupChange}
                placeholder="Add a pickup location"
                className="w-full py-3 px-4 pl-8 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                onClick={() => {
                  setPanelOpen(true);
                  setActiveField("destination");
                }}
                value={destination}
                onChange={handleDestinationChange}
                placeholder="Enter your destination"
                className="w-full py-3 px-4 pl-8 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={findTripFare}
                disabled={pickup === "" || destination === ""}
                className={`w-full bg-black text-white p-2 text-lg rounded ${
                  pickup === "" || destination === ""
                    ? " cursor-not-allowed"
                    : ""
                }`}
              >
                Find a trip
              </button>
            </form>
          </div>
          <div
            className={`${
              panelOpen ? "h-[65%]" : "h-0"
            } bg-white transition-all duration-500 overflow-hidden rounded-t-lg shadow-md`}
          >
            <LocationSearchPanel
              suggestions={
                activeField === "pickup"
                  ? pickupSuggestions
                  : destinationSuggestions
              }
              setPanelOpen={setPanelOpen}
              setVehiclePanel={setVehiclePanel}
              setPickup={setPickup}
              setDestination={setDestination}
              activeField={activeField}
            />
          </div>
        </div>
      </div>
      <VehiclePanle
        fare={fare}
        setVehicle={setVehicle}
        setVehiclePanel={setVehiclePanel}
        vehiclePanel={vehiclePanel}
        setConfirmRidePanel={setConfirmRidePanel}
      />
      <ConfirmRide
        pickup={pickup}
        destination={destination}
        fare={fare}
        vehicle={vehicle}
        createRide={createRide}
        confirmRidePanel={confirmRidePanel}
        setConfirmRidePanel={setConfirmRidePanel}
        setVehicleFound={setVehicleFound}
      />
      <LookingForDriver
        pickup={pickup}
        destination={destination}
        fare={fare}
        vehicle={vehicle}
        vehicleFound={vehicleFound}
        setVehicleFound={setVehicleFound}
      />
      <WaitingForDriver
        ride={ride}
        waitingForDriver={waitingForDriver}
        setWaitingForDriver={setWaitingForDriver}
      />
    </div>
  );
};

export default Home;
