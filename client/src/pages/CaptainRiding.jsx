import React, { useState } from "react";
import { ArrowLeft, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import FinishRide from "../components/FinishRide";

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  return (
    <div className="bg-gray-100">
      <div className="h-screen lg:max-w-[50%] mx-auto bg-white shadow-lg">
        <Link to="/captain-home">
          <ArrowLeft className="fixed m-3 bg-white rounded-full p-2 h-10 w-10 cursor-pointer shadow-md" />
        </Link>

        <div className="h-4/5">
          <img
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
            alt="Background"
            className="h-full w-full object-cover rounded-b-lg"
          />
        </div>

        <div
          className="h-1/5 bg-yellow-300 flex flex-col items-center p-2"
          onClick={() => {
            setFinishRidePanel(true);
          }}
        >
          <ChevronUp className="text-gray-700 h-6 w-6 mb-5 cursor-pointer" />

          <div className="flex items-center w-full gap-4">
            <h4 className="text-xl font-semibold flex-1 text-center">
              4 km away
            </h4>
            <button className="bg-green-600 text-white font-semibold py-3 px-4 rounded-lg flex-1 hover:bg-green-700 transition-all">
              Complete
            </button>
          </div>
        </div>
      </div>
      <FinishRide
        finishRidePanel={finishRidePanel}
        setFinishRidePanel={setFinishRidePanel}
      />
    </div>
  );
};

export default CaptainRiding;
