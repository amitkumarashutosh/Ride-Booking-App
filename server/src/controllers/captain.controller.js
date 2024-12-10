import { validationResult } from "express-validator";
import { Captain } from "../models/captain.model.js";
import { createCaptain } from "../services/captain.service.js";
import { BlacklistToken } from "../models/blackListToken.model.js";

const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  const isCaptainExist = await Captain.findOne({ email });
  if (isCaptainExist) {
    return res.status(400).json({ message: "Captain already exist" });
  }

  const hashedPassword = await Captain.hashPassword(password);

  const captain = await createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  const captainResponse = captain.toObject();
  delete captainResponse.password;

  const token = captain.generateAuthToken();

  res.status(201).json({ token, captain: captainResponse });
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const captain = await Captain.findOne({ email });
  if (!captain) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isPasswordMatch = await captain.comparePassword(password);
  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const captainResponse = captain.toObject();
  delete captainResponse.password;

  const token = captain.generateAuthToken();
  res
    .cookie("token", token)
    .status(200)
    .json({ captain: captainResponse, token });
};

const getCaptainProfile = async (req, res) => {
  res.status(200).json({ captain: req.captain });
};

const logout = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await BlacklistToken.create({ token });

  res.clearCookie("token").status(200).json({ message: "Logged out" });
};

export { register, login, getCaptainProfile, logout };
