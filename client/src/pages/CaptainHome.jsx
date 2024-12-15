import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopup from "../components/RidePopup";
import { useContext, useEffect, useState } from "react";
import ConfirmRidePopup from "../components/ConfirmRidePopup";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(true);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    socket.emit("join", { userType: "captain", userId: captain._id });
  }, [captain]);

  return (
    <div className="bg-gray-100">
      <div className="h-screen lg:max-w-[50%] mx-auto bg-white shadow-lg">
        {/* Back Button */}
        <Link to="/captain-home">
          <ArrowLeft className="fixed m-3 bg-white rounded-full p-2 h-10 w-10 cursor-pointer shadow-md" />
        </Link>

        {/* Background Image */}
        <div className="h-3/5">
          <img
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
            alt="Background"
            className="h-full w-full object-cover rounded-b-lg"
          />
        </div>

        {/* Content Section */}
        <div className="h-2/5 p-5 md:w-3/5 mx-auto">
          <CaptainDetails />
        </div>

        <RidePopup
          ridePopupPanel={ridePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        />
        <ConfirmRidePopup
          confirmRidePopupPanel={confirmRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
