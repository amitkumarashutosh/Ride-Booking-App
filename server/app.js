import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./src/db/index.js";

const app = express();

connectDB();

app.use(cors());

app.get("/health", (req, res) => {
  res.json({ message: "Health OK!" });
});

export default app;
