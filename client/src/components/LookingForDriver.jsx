import { ArrowDown, Coins, LocateFixed, MapPin } from "lucide-react";

const LookingForDriver = ({
  setVehicleFound,
  vehicleFound,
  pickup,
  destination,
  fare,
  vehicle,
}) => {
  return (
    <div
      className={`fixed w-full z-10 bottom-0 ${
        vehicleFound ? "translate-y-0" : "translate-y-full"
      } bg-white p-5 md:max-w-[50%] mx-auto rounded-t-lg shadow-lg`}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-3xl">Looking for a driver ...</h3>
        <ArrowDown
          className="cursor-pointer text-gray-600"
          onClick={() => setVehicleFound(false)}
        />
      </div>

      <div className="flex gap-4 flex-col items-center justify-center">
        <img src={vehicle.image} alt="RideEase vehicle" className="h-24 mb-6" />

        <div className="w-full">
          {/* Pickup Section */}
          <div className="flex w-full items-center mb-2 gap-4 justify-start py-3 px-4 border-b-2 border-gray-200">
            <LocateFixed className="text-blue-600 text-lg" />
            <div className="flex flex-col">
              <h3 className="font-normal text-lg">{pickup}</h3>
            </div>
          </div>

          {/* Destination Section */}
          <div className="flex w-full items-center mb-2 gap-4 justify-start py-3 px-4 border-b-2 border-gray-200">
            <MapPin className="text-blue-600 text-lg" />
            <div className="flex flex-col">
              <h3 className="font-normal text-lg">{destination}</h3>
            </div>
          </div>

          {/* Payment Section */}
          <div className="flex w-full items-center mb-2 gap-4 justify-start py-3 px-4 border-b-2 border-gray-200">
            <Coins className="text-blue-600 text-lg" />
            <div className="flex flex-col">
              <h3 className="font-normal text-lg">₹{fare[vehicle.type]}</h3>
              <p className="text-sm text-gray-600">Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
