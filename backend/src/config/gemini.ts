import { GoogleGenAI } from "@google/genai";

import dotenv from "dotenv";

dotenv.config();

export const geminiAi = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateInerviewQuestions(
  jobRole: string,
  experienceLevel: string,
  techstack: string,
  interviewType: string,
  numberOfQuestions: number
) {
  try {
    const response = await geminiAi.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Prepare questions for a job interview.
        The job role is ${jobRole}.
        The job experience level is ${experienceLevel}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${interviewType}.
        The amount of questions required is: ${numberOfQuestions}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the response formatted like this:
        ["Question 1", "Question 2", "Question 3"]
         
        Thank you! <3
    `,
    });

    return response.text;
  } catch (error) {
    console.log(error);
  }
}
