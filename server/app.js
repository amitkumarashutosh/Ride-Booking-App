import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/health", (req, res) => {
  res.json({ message: "Health OK!" });
});

export default app;
