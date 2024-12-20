import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainSignup = () => {
  const [captainData, setCaptainData] = useState({
    fullname: {
      firstname: "",
      lastName: "",
    },
    email: "",
    password: "",
    vehicle: {
      capacity: 1,
      vehicleType: "",
      color: "",
      plate: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { captain, setCaptain } = useContext(CaptainDataContext);

  const changeHandler = (e) => {
    const { name, value } = e.target;

    if (name === "firstname" || name === "lastName") {
      setCaptainData({
        ...captainData,
        fullname: {
          ...captainData.fullname,
          [name]: value,
        },
      });
    } else if (Object.keys(captainData.vehicle).includes(name)) {
      setCaptainData({
        ...captainData,
        vehicle: {
          ...captainData.vehicle,
          [name]: value,
        },
      });
    } else {
      setCaptainData({
        ...captainData,
        [name]: value,
      });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/captains/register`,
        captainData
      );
      if (response.status === 201) {
        setCaptain(response.data.captain);
        localStorage.setItem("token", response.data.token);
        navigate("/captain-home");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Sign Up as Partner
        </h1>
        <form className="space-y-4" onSubmit={submitHandler}>
          <div>
            <label htmlFor="firstname" className="block text-gray-600 mb-1">
              Full Name
            </label>
            <div className="flex space-x-4">
              <div className="flex-1">
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={captainData.fullname.firstname}
                  onChange={changeHandler}
                  placeholder="First Name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={captainData.fullname.lastName}
                  onChange={changeHandler}
                  placeholder="Last Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={captainData.email}
              onChange={changeHandler}
              placeholder="example@gmail.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="********"
              name="password"
              value={captainData.password}
              onChange={changeHandler}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="vehicle" className="block text-gray-600 mb-1">
              Vehicle Information
            </label>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <select
                    id="vehicleType"
                    name="vehicleType"
                    value={captainData.vehicle.vehicleType}
                    onChange={changeHandler}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="" disabled>
                      Vehicle Type
                    </option>
                    <option value="car">car</option>
                    <option value="auto">auto</option>
                    <option value="motorcycle">motorcycle</option>
                  </select>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    id="capacity"
                    name="capacity"
                    value={captainData.vehicle.capacity}
                    onChange={changeHandler}
                    placeholder="capacity"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md "
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <input
                    type="text"
                    id="color"
                    name="color"
                    value={captainData.vehicle.color}
                    onChange={changeHandler}
                    placeholder="Color"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    id="plate"
                    name="plate"
                    value={captainData.vehicle.plate}
                    onChange={changeHandler}
                    placeholder="License Plate"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
          {loading ? (
            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 flex justify-center items-center gap-3"
              disabled
            >
              <Loader2 className="ml-2 h-4 w-4 animate-spin" /> Please wait...
            </button>
          ) : (
            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
            >
              Sign Up
            </button>
          )}
        </form>
        <div className="flex items-center my-4">
          <hr className="flex-1 border-gray-300" />
          <span className="px-3 text-gray-500">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>
        <Link
          to="/google"
          className="w-full flex items-center justify-center border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Continue with Google
        </Link>
        <div className="mt-4">
          <Link
            to="/signup"
            className="w-full py-2 px-4 flex justify-center text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Sign up as Rider
          </Link>
        </div>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/captain-login"
            className="text-gray-800 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
