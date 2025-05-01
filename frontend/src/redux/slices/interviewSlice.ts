import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ExperienceLevel {
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Advanced = "Advanced",
}

export enum InterviewType {
  Technical = "Technical",
  Behavioural = "Behavioural",
  Mixed = "Mixed",
}

export interface Interview {
  id: string;
  jobRole: string;
  experienceLevel: ExperienceLevel;
  techStack: string[];
  interviewType: InterviewType;
  numberOfQuestions: number;
  createdBy: string;
  createdAt: string;
  isPublic: boolean;
}

interface InterviewState {
  interviews: Interview[];
  currentInterview: Interview | null;
  loading: boolean;
  error: string | null;
}

const initialState: InterviewState = {
  interviews: [],
  currentInterview: null,
  loading: false,
  error: null,
};

const interviewSlice = createSlice({
  name: "interview",
  initialState,
  reducers: {
    fetchInterviewsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchInterviewsSuccess: (state, action: PayloadAction<Interview[]>) => {
      state.interviews = action.payload;
      state.loading = false;
    },
    fetchInterviewsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    createInterviewStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createInterviewSuccess: (state, action: PayloadAction<Interview>) => {
      state.interviews.push(action.payload);
      state.loading = false;
    },
    createInterviewFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentInterview: (state, action: PayloadAction<Interview | null>) => {
      state.currentInterview = action.payload;
    },
    startInterview: (state) => {
      if (state.currentInterview) {
        // logic
      }
    },
    endInterview: (state) => {
      console.log(state);
      // logic
    },
    clearInterviewError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchInterviewsStart,
  fetchInterviewsSuccess,
  fetchInterviewsFailure,
  createInterviewStart,
  createInterviewSuccess,
  createInterviewFailure,
  setCurrentInterview,
  startInterview,
  endInterview,
  clearInterviewError,
} = interviewSlice.actions;

export default interviewSlice.reducer;
