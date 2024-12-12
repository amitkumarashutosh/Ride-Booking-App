import { ArrowDown, Coins, LocateFixed, MapPin } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ConfirmRidePopup = ({
  setConfirmRidePopupPanel,
  confirmRidePopupPanel,
}) => {
  const [otp, setOtp] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(otp);
  };
  return (
    <div
      className={`fixed w-full z-10 bottom-0 h-screen ${
        confirmRidePopupPanel === true ? "translate-y-0" : "translate-y-full"
      } bg-white p-5 transition-all duration-500 overflow-hidden lg:max-w-[50%] mx-auto rounded-t-lg shadow-lg`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-2xl text-gray-800">
          Confirm this ride to start
        </h3>
        <ArrowDown
          onClick={() => setConfirmRidePopupPanel(false)}
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
            <h4 className="font-bold text-lg text-gray-800">Ashu Singh</h4>
          </div>
          <p className="font-medium text-lg text-gray-700">2.3 Km</p>
        </div>

        {/* Ride Information Cards */}
        <div className="w-full space-y-2">
          {/* Pickup Location */}
          <div className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg hover:shadow-md transition-all">
            <LocateFixed className="text-green-600 h-6 w-6" />
            <div>
              <h4 className="font-semibold text-lg text-gray-800">
                12/2 MS Residency
              </h4>
              <p className="text-sm text-gray-500">
                3rd B Main Road, Bangalore 511023
              </p>
            </div>
          </div>

          {/* Destination */}
          <div className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg hover:shadow-md transition-all">
            <MapPin className="text-blue-600 h-6 w-6" />
            <div>
              <h4 className="font-semibold text-lg text-gray-800">
                12/2 MS Residency
              </h4>
              <p className="text-sm text-gray-500">
                3rd B Main Road, Bangalore 511023
              </p>
            </div>
          </div>

          {/* Payment Info */}
          <div className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg hover:shadow-md transition-all">
            <Coins className="text-yellow-600 h-6 w-6" />
            <div>
              <h4 className="font-semibold text-lg text-gray-800">₹200.9</h4>
              <p className="text-sm text-gray-500">Cash</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full">
          <form>
            <input
              type="text"
              className="w-full py-3 px-4 pl-8 border border-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
            />
            <div className="w-full flex gap-4">
              <Link
                to="/captain-riding"
                className="flex-1 bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-all text-center"
                aria-label="Confirm ride"
              >
                Confirm
              </Link>

              <button
                onClick={() => {
                  setConfirmRidePopupPanel(false);
                }}
                className="flex-1 bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition-all"
                aria-label="Ignore ride"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopup;
