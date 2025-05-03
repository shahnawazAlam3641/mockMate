import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth";
import { connectDB } from "./config/db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res): void => {
  res.json({ message: "working" });
  return;
});

app.use("/api/v1/auth", authRoutes);

connectDB().then(() =>
  app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
);
