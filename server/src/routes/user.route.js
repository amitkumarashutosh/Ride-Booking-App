import express from "express";
const router = express.Router();
import { body } from "express-validator";
import {
  register,
  login,
  logout,
  getUserProfile,
} from "../controllers/user.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 6 characters long"),
    body("password")
      .isLength({ min: 4 })
      .withMessage("Password must be 6 characters long"),
  ],
  register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be 6 characters long"),
  ],
  login
);

router.get("/profile", authUser, getUserProfile);
router.get("/logout", authUser, logout);

export default router;
