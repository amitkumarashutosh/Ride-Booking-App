import { Coins, Home, MapPin } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import { useContext } from "react";

const Riding = () => {
  const location = useLocation();
  const { ride } = location.state || {};
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  socket.on("ride-ended", (data) => {
    navigate("/home");
  });

  return (
    <div className="bg-gray-100">
      <div className="h-screen md:max-w-[50%] mx-auto bg-white">
        <Link to="/home">
          <Home className="fixed m-3 bg-white rounded-full p-2 h-10 w-10 cursor-pointer" />
        </Link>
        <div className="h-1/2">
          <img
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
            alt="Background"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="h-1/2 p-4">
          <div className="flex gap-2 flex-col items-center justify-center">
            {/* Driver Info Section */}
            <div className="flex justify-between w-full items-center mb-2">
              <img
                src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
                alt="RideEase Car"
                className="h-20 mb-6"
              />
              <div className="flex flex-col text-center">
                <h3 className="font-bold text-lg">
                  {ride?.captain?.fullname.firstname}
                </h3>
                <p className="text-md font-semibold text-gray-600">
                  {ride?.captain?.vehicle.plate}
                </p>
                <p className="text-sm text-gray-600">Maruti Suzuki</p>
              </div>
            </div>

            <div className="w-full">
              {/* Destination Address Section */}
              <div className="flex w-full items-center mb-1 gap-2 justify-start p-4 border-b-2 border-gray-300 hover:shadow-lg active:border-black rounded-lg transition-all">
                <MapPin className="text-xl" />
                <div className="flex flex-col">
                  <h3 className="font-normal text-xl">{ride?.destination}</h3>
                </div>
              </div>
              {/* Payment Section */}
              <div className="flex w-full items-center mb-1 gap-4 justify-start p-4 border-b-2 border-gray-300 hover:shadow-lg active:border-black rounded-lg transition-all">
                <Coins className="text-xl" />
                <div className="flex flex-col">
                  <h3 className="font-semibold text-xl">₹{ride?.fare}</h3>
                  <p className="text-sm text-gray-600">Cash</p>
                </div>
              </div>
            </div>

            {/* Payment Button */}
            <button className="w-full bg-green-600 text-white font-semibold p-3 rounded-lg cursor-pointer hover:bg-green-700 transition-all">
              Make payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Riding;
