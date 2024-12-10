import { validationResult } from "express-validator";
import { User } from "../models/user.model.js";
import { createUser } from "../services/user.service.js";
import { BlacklistToken } from "../models/blackListToken.model.js";

const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    return res.status(400).json({ message: "User already exist" });
  }

  const hashedPassword = await User.hashPassword(password);

  const user = await createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();

  const userResponse = user.toObject();
  delete userResponse.password;

  res.status(201).json({ token, user: userResponse });
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const userResponse = user.toObject();
  delete userResponse.password;

  const token = user.generateAuthToken();
  res.cookie("token", token).status(200).json({ user: userResponse, token });
};

const getUserProfile = async (req, res) => {
  res.status(200).json({ user: req.user });
};

const logout = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await BlacklistToken.create({ token });

  res.clearCookie("token").status(200).json({ message: "Logged out" });
};

export { register, login, getUserProfile, logout };
