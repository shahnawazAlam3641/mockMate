import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CategoryScore {
  name: string;
  score: number;
  comment: string;
}

export interface Feedback {
  _id: string;
  interview: string;
  user: string;
  totalScore: number;
  categoryScores: CategoryScore[];
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
  createdAt: string;
}

interface FeedbackState {
  feedback: Feedback | null;
  loading: boolean;
  error: string | null;
}

const initialState: FeedbackState = {
  feedback: null,
  loading: false,
  error: null,
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    fetchFeedbackStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchFeedbackSuccess: (state, action: PayloadAction<Feedback>) => {
      state.feedback = action.payload;
      state.loading = false;
    },
    fetchFeedbackFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearFeedback: (state) => {
      state.feedback = null;
    },
    clearFeedbackError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchFeedbackStart,
  fetchFeedbackSuccess,
  fetchFeedbackFailure,
  clearFeedback,
  clearFeedbackError,
} = feedbackSlice.actions;

export default feedbackSlice.reducer;
