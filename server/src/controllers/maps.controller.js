import {
  getAddressCoordinate,
  getAutoCompleteSuggestion,
  getDistanceTimeData,
} from "../services/maps.service.js";
import { validationResult } from "express-validator";

const getCoordinates = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { address } = req.query;
    const coordinates = await getAddressCoordinate(address);
    res.status(200).json(coordinates);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getDistanceTime = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { origin, destination } = req.query;
    const distanceTime = await getDistanceTimeData(origin, destination);
    return res.status(200).json(distanceTime);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAutoCompleteSuggestions = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { input } = req.query;
    const suggestions = await getAutoCompleteSuggestion(input);
    res.status(200).json(suggestions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getCoordinates, getDistanceTime, getAutoCompleteSuggestions };
