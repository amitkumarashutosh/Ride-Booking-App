import { ArrowDown, Coins, LocateFixed, MapPin } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const FinishRide = ({ finishRidePanel, setFinishRidePanel, rideData }) => {
  const navigate = useNavigate();
  const endRide = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/rides/end-ride`,
      {
        rideId: rideData._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 200) {
      navigate("/captain-home");
    }
  };
  return (
    <div
      className={`fixed w-full z-10 bottom-0 ${
        finishRidePanel === true ? "translate-y-0" : "translate-y-full"
      } bg-white p-5 transition-all duration-500 overflow-hidden lg:max-w-[50%] mx-auto rounded-t-lg shadow-lg`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-2xl text-gray-800">
          Finish this ride
        </h3>
        <ArrowDown
          onClick={() => setFinishRidePanel(false)}
          className="cursor-pointer text-gray-600 hover:text-black transition-all"
        />
      </div>

      {/* Ride Details */}
      <div className="flex flex-col gap-6 items-center justify-center">
        {/* Driver Info */}
        <div className="flex justify-between items-center w-full bg-yellow-300 p-3 rounded-md">
          <div className="flex items-center gap-4 ">
            <img
              src="https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg="
              alt="Driver"
              className="h-14 w-14 rounded-full object-cover"
            />
            <h4 className="font-bold text-lg text-gray-800">
              {rideData?.user.fullname.firstname}
            </h4>
          </div>
          <p className="font-medium text-lg text-gray-700">2.3 Km</p>
        </div>

        {/* Ride Information Cards */}
        <div className="w-full space-y-2">
          {/* Pickup Location */}
          <div className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg hover:shadow-md transition-all">
            <LocateFixed className="text-green-600 h-6 w-6" />
            <div>
              <h4 className="font-normal text-lg text-gray-800">
                {rideData?.pickup}
              </h4>
            </div>
          </div>

          {/* Destination */}
          <div className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg hover:shadow-md transition-all">
            <MapPin className="text-blue-600 h-6 w-6" />
            <div>
              <h4 className="font-normal text-lg text-gray-800">
                {rideData?.destination}
              </h4>
            </div>
          </div>

          {/* Payment Info */}
          <div className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg hover:shadow-md transition-all">
            <Coins className="text-yellow-600 h-6 w-6" />
            <div>
              <h4 className="font-semibold text-lg text-gray-800">
                ₹{rideData?.fare}
              </h4>
              <p className="text-sm text-gray-500">Cash</p>
            </div>
          </div>
        </div>
        <button
          onClick={endRide}
          className="flex-1 bg-green-600 w-full  text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-all text-center"
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default FinishRide;
