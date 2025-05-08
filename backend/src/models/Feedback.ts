import mongoose from "mongoose";
import { CategoryScore, FeedbackDocument } from "../types";

const CategoryScoreSchema = new mongoose.Schema<CategoryScore>(
  {
    name: {
      type: String,
      enum: [
        "Communication Skills",
        "Technical Knowledge",
        "Problem Solving",
        "Cultural Fit",
        "Confidence and Clarity",
      ],
      required: true,
    },
    score: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  { _id: false }
);

const FeedbackSchema = new mongoose.Schema<FeedbackDocument>(
  {
    interview: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interview",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    totalScore: { type: Number, required: true },
    categoryScores: {
      type: [CategoryScoreSchema],
      validate: {
        validator: (arr: CategoryScore[]) => arr.length === 5,
        message: "categoryScores must contain exactly 5 items.",
      },
      required: true,
    },
    strengths: { type: [String], required: true },
    areasForImprovement: { type: [String], required: true },
    finalAssessment: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<FeedbackDocument>("Feedback", FeedbackSchema);
