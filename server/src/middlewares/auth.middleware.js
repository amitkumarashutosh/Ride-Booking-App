import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BlacklistToken } from "../models/blackListToken.model.js";
import { Captain } from "../models/captain.model.js";

export const authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlacklisted = await BlacklistToken.findOne({ token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decode._id);

    const userResponse = user.toObject();
    delete userResponse.password;

    req.user = userResponse;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlacklisted = await BlacklistToken.findOne({ token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await Captain.findById(decode._id);

    req.captain = captain;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
