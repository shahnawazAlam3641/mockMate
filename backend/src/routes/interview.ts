import express, { Request, Response } from "express";
import { auth } from "../middlewares/auth";
import { z } from "zod";
import Interview from "../models/Interview";
import { generateInerviewQuestions } from "../config/gemini";
import mongoose from "mongoose";

const router = express.Router();

const createInterviewSchema = z.object({
  userid: z.string(),
  jobRole: z
    .string()
    .min(3, "role must be at least 3 characters")
    .max(50, "role cannot exceed 50 characters"),
  experienceLevel: z
    .string()
    .min(3, "level must be at least 3 characters")
    .max(50, "level cannot exceed 50 characters"),
  techStack: z.string(),
  interviewType: z.string(),
  numberOfQuestions: z.number(),
});

//create interview
router.post(
  "/generateInterview",

  async (req: Request, res: Response): Promise<void> => {
    try {
      const result = createInterviewSchema.safeParse(req.body);

      if (!result.success) {
        res.status(400).json({
          success: false,
          message: result.error.errors[0].message,
          errors: result.error.errors.map((err) => ({
            path: err.path.join("."),
            message: err.message,
          })),
        });
        return;
      }

      const {
        userid,
        jobRole,
        experienceLevel,
        techStack,
        interviewType,
        numberOfQuestions,
      } = result.data;

      const questions = await generateInerviewQuestions(
        jobRole,
        experienceLevel,
        techStack,
        interviewType,
        numberOfQuestions
      );

      if (!questions) {
        res.status(400).json({
          success: false,
          message: "Something went wrong while generating questions",
        });
        return;
      }

      //   console.log(JSON.parse(questions));

      const interview = await Interview.create({
        createdBy: userid,
        jobRole,
        experienceLevel,
        techStack: techStack.split(","),
        interviewType,
        numberOfQuestions,
        questions: JSON.parse(questions),
      });

      res.status(200).json({
        success: true,
        message: "Interview created successfully",
        interview: interview,
      });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Something went wrong while Creating Interview",
        error,
      });
    }
  }
);

//fetch interview
router.get("/:id", auth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const interview = await Interview.findById(id);

    if (!interview) {
      res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Fetched Interview Successfully",
      interview,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching interview details",
      error,
    });
  }
});

//fetch current user interview
router.get(
  "/getUserInterviews",
  auth,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const interviews = await Interview.find({ createdBy: req.userId });

      if (!interviews) {
        res.status(404).json({
          success: false,
          message: "No interviews found",
          interviews: [],
        });
        return;
      }

      res.status(200).json({
        success: false,
        message: "Fetched User Interviews Successfully",
        interviews,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Something went wrong while fetching User Interview",
        error,
      });
    }
  }
);

//fetch all interviews
router.post("/getAll", async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    const interviews = await Interview.find({
      createdBy: { $ne: userId },
    });

    if (!interviews) {
      res.status(404).json({
        success: false,
        message: "No interviews found",
        interviews: [],
      });
      return;
    }

    res.status(200).json({
      success: false,
      message: "Fetched Interviews Successfully",
      interviews,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching Interviews",
      error,
    });
  }
});

export default router;
