import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./src/db/index.js";
import cookieParser from "cookie-parser";

import userRoute from "./src/routes/user.route.js";
import captainRoute from "./src/routes/captain.route.js";
import mapsRouter from "./src/routes/maps.route.js";
import rideRouter from "./src/routes/ride.route.js";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoute);
app.use("/api/captains", captainRoute);
app.use("/api/maps", mapsRouter);
app.use("/api/rides", rideRouter);

app.get("/health", (req, res) => {
  res.json({ message: "Health OK!" });
});

export default app;
