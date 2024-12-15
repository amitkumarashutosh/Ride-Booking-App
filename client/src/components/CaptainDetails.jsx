import { Gauge, Notebook, Timer } from "lucide-react";
import { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);
  return (
    <div>
      {/* Driver Info */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <img
            src="https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg="
            alt="Driver"
            className="h-12 w-12 rounded-full object-cover"
          />
          <h4 className="font-bold text-lg text-gray-800 capitalize">
            {captain.fullname.firstname} {captain.fullname.lastname}
          </h4>
        </div>
        <div className="text-right">
          <h4 className="font-semibold text-xl text-green-600">₹295.9</h4>
          <p className="bg-gray-200 text-gray-700 text-sm py-1 px-2 rounded-md">
            Earned
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="p-4 rounded-lg  bg-gray-100 ">
        <div className="flex justify-between items-cente">
          <div className="flex flex-col items-center space-y-1">
            <Timer className="text-gray-700 h-10 w-10" />
            <p className="text-base font-semibold text-gray-800">
              10 <span className="font-light">hours</span>
            </p>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <Gauge className="text-gray-700 h-10 w-10" />
            <p className="text-base font-semibold text-gray-800">
              40 <span className="font-light">km/hr</span>
            </p>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <Notebook className="text-gray-700 h-10 w-10" />
            <p className="text-base font-semibold text-gray-800">
              Hindi <span className="font-light"> lang</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
