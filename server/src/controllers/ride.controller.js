import { validationResult } from "express-validator";
import { createRideService, getFare } from "../services/ride.service.js";

const createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, vehicleType, destination } = req.body;

  try {
    const ride = await createRideService({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    return res.status(201).json(ride);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination } = req.query;
  try {
    const fare = await getFare(pickup, destination);
    res.status(200).json(fare);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createRide, getAllFare };
