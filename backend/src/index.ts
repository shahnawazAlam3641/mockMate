import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth";
import interviewRoutes from "./routes/interview";
import feedbackRoutes from "./routes/feedback";
import { connectDB } from "./config/db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const allowedOrigins = [
  process.env.CLIENT_URL,
  "https://shahnawaz-portfolio.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.get("/api/v1/ping", (req, res) => {
  res.send("Pong");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/interview", interviewRoutes);
app.use("/api/v1/feedback", feedbackRoutes);

connectDB().then(() =>
  app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
);
