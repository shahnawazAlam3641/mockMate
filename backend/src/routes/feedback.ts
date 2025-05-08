import express, { Request, Response } from "express";
import { auth } from "../middlewares/auth";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import Feedback from "../models/Feedback";

const router = express.Router();

export const feedbackSchema = z.object({
  totalScore: z.number(),
  categoryScores: z.tuple([
    z.object({
      name: z.literal("Communication Skills"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Technical Knowledge"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Problem Solving"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Cultural Fit"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Confidence and Clarity"),
      score: z.number(),
      comment: z.string(),
    }),
  ]),
  strengths: z.array(z.string()),
  areasForImprovement: z.array(z.string()),
  finalAssessment: z.string(),
});

//generate Feedback
router.post(
  "/generate",
  auth,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { interviewId, transcript } = req.body;

      const formattedTranscript = transcript
        .map(
          (sentence: { role: string; content: string }) =>
            `- ${sentence.role}: ${sentence.content}\n`
        )
        .join("");

      const { object } = await generateObject({
        model: google("gemini-2.0-flash-lite", {
          structuredOutputs: false,
        }),
        schema: feedbackSchema,

        prompt: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${formattedTranscript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit**: Alignment with company values and job role.
        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
        `,
        system:
          "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories, You are giving Feedback to Interviewee",
      });

      const feedback = await Feedback.create({
        user: req.userId,
        interview: interviewId,
        totalScore: object.totalScore,
        categoryScores: [
          {
            name: object.categoryScores[0].name,
            score: object.categoryScores[0].score,
            comment: object.categoryScores[0].comment,
          },
          {
            name: object.categoryScores[1].name,
            score: object.categoryScores[1].score,
            comment: object.categoryScores[1].comment,
          },
          {
            name: object.categoryScores[2].name,
            score: object.categoryScores[2].score,
            comment: object.categoryScores[2].comment,
          },
          {
            name: object.categoryScores[3].name,
            score: object.categoryScores[3].score,
            comment: object.categoryScores[3].comment,
          },
          {
            name: object.categoryScores[4].name,
            score: object.categoryScores[4].score,
            comment: object.categoryScores[4].comment,
          },
        ],
        strengths: object.strengths,
        areasForImprovement: object.areasForImprovement,
        finalAssessment: object.finalAssessment,
      });

      res.status(200).json({
        success: true,
        message: "Generated feedback successfully",
        feedback,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Something went wrong while generating feedback",
        error,
      });
      return;
    }
  }
);

//get feedback
router.get(
  "/get/:id",
  auth,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const feedback = await Feedback.findById(id);

      if (!feedback) {
        res.status(404).json({
          success: false,
          message: "Feedback not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Fetched Feedback Successfully",
        feedback,
      });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Something went wrong while fetching feedback",
        error,
      });
      return;
    }
  }
);

export default router;
