import mongoose, { Document } from "mongoose";

export interface UserDocument extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export interface InterviewDocument extends Document {
  _id: mongoose.Types.ObjectId;
  jobRole: string;
  experienceLevel: "Beginner" | "Intermediate" | "Advanced";
  techStack: string[];
  interviewType: "Technical" | "Behavioural" | "Mixed";
  numberOfQuestions: number;
  createdBy: mongoose.Types.ObjectId;
  questions: string[];
}
