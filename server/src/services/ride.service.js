import { sendMessageToSocket } from "../../socket.js";
import { Ride } from "../models/ride.model.js";
import { getDistanceTimeData } from "./maps.service.js";
import crypto from "crypto";

const generateOtp = (num) => {
  const otp = crypto
    .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
    .toString();
  return otp;
};

const getFare = async (pickup, destination) => {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const distanceTime = await getDistanceTimeData(pickup, destination);

  const baseFare = {
    auto: 30,
    car: 50,
    motorcycle: 20,
  };
  const perKmRate = {
    auto: 10,
    car: 15,
    motorcycle: 8,
  };
  const perMinuteRate = {
    auto: 2,
    car: 3,
    motorcycle: 1.5,
  };

  const fare = {
    auto: Math.round(
      baseFare.auto +
        (distanceTime.distance.value / 1000) * perKmRate.auto +
        (distanceTime.duration.value / 60) * perMinuteRate.auto
    ),
    car: Math.round(
      baseFare.car +
        (distanceTime.distance.value / 1000) * perKmRate.car +
        (distanceTime.duration.value / 60) * perMinuteRate.car
    ),
    motorcycle: Math.round(
      baseFare.motorcycle +
        (distanceTime.distance.value / 1000) * perKmRate.motorcycle +
        (distanceTime.duration.value / 60) * perMinuteRate.motorcycle
    ),
  };
  return fare;
};

const createRideService = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fare = await getFare(pickup, destination);

  const ride = await Ride.create({
    user,
    pickup,
    destination,
    otp: generateOtp(4),
    fare: fare[vehicleType],
  });

  return ride;
};

const confirmRideService = async (rideId, captainId) => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }

  await Ride.findOneAndUpdate(
    { _id: rideId },
    { status: "accepted", captain: captainId }
  );

  const ride = await Ride.findOne({ _id: rideId })
    .populate("user")
    .populate("captain");
  if (!ride) {
    throw new Error("Ride not found");
  }

  return ride;
};

const startRideService = async ({ rideId, otp, captain }) => {
  if (!rideId || !otp) {
    throw new Error("RideId and otp are required");
  }

  const ride = await Ride.findOne({ _id: rideId })
    .populate("user")
    .populate("captain");

  if (!ride) throw new Error("Ride not found!");

  if (ride.status !== "accepted") throw new Error("Ride not accepted");

  if (ride.otp !== otp) throw new Error("Invalid OPT");

  await Ride.findByIdAndUpdate(
    {
      _id: rideId,
    },
    { status: "ongoing" }
  );

  sendMessageToSocket(ride.user.socketId, {
    event: "ride-started",
    data: ride,
  });
  return ride;
};

const endRideService = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }

  const ride = await Ride.findOne({
    _id: rideId,
    captain: captain._id,
  })
    .populate("user")
    .populate("captain");

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "ongoing") {
    throw new Error("Ride not ongoing");
  }

  await Ride.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "completed",
    }
  );

  return ride;
};

export {
  createRideService,
  getFare,
  confirmRideService,
  startRideService,
  endRideService,
};
