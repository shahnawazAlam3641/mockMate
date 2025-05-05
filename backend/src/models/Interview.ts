import mongoose from "mongoose";
import { InterviewDocument } from "../types";

const InterviewSchema = new mongoose.Schema<InterviewDocument>(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobRole: {
      type: String,
    },
    experienceLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    techStack: {
      type: [String],
      required: true,
    },
    interviewType: {
      type: String,
      enum: ["Technical", "Behavioural", "Mixed"],
      required: true,
    },
    numberOfQuestions: {
      type: Number,
      required: true,
    },
    questions: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<InterviewDocument>("Interview", InterviewSchema);
