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
  currentUserInterviews: Interview[];
  otherUserInterviews: Interview[];
  currentInterview: Interview | null;
  currentUserLoading: boolean;
  otherUserLoading: boolean;
  createInterviewLoading: boolean;
  currentUserError: string | null;
  otherUserError: string | null;
  createInterviewError: string | null;
}

const initialState: InterviewState = {
  currentUserInterviews: [],
  otherUserInterviews: [],
  currentInterview: null,
  currentUserLoading: false,
  otherUserLoading: false,
  createInterviewLoading: false,
  currentUserError: null,
  otherUserError: null,
  createInterviewError: null,
};

const interviewSlice = createSlice({
  name: "interview",
  initialState,
  reducers: {
    fetchCurrentUserInterviewsStart: (state) => {
      state.currentUserLoading = true;
      state.currentUserError = null;
    },

    fetchOtherUserInterviewsStart: (state) => {
      state.otherUserLoading = true;
      state.otherUserError = null;
    },

    fetchCurrentUserInterviewsSuccess: (
      state,
      action: PayloadAction<Interview[]>
    ) => {
      state.currentUserInterviews = action.payload;
      state.currentUserLoading = false;
    },

    fetchOtherUserInterviewsSuccess: (
      state,
      action: PayloadAction<Interview[]>
    ) => {
      state.otherUserInterviews = action.payload;
      state.otherUserLoading = false;
    },

    fetchCurrentUserInterviewsFailure: (
      state,
      action: PayloadAction<string>
    ) => {
      state.currentUserLoading = false;
      state.currentUserError = action.payload;
    },

    fetchOtherUserInterviewsFailure: (state, action: PayloadAction<string>) => {
      state.otherUserLoading = false;
      state.otherUserError = action.payload;
    },

    createInterviewStart: (state) => {
      state.createInterviewLoading = true;
      state.createInterviewError = null;
    },

    createInterviewSuccess: (state, action: PayloadAction<Interview>) => {
      state.currentUserInterviews.push(action.payload);
      state.createInterviewLoading = false;
    },
    createInterviewFailure: (state, action: PayloadAction<string>) => {
      state.createInterviewLoading = false;
      state.createInterviewError = action.payload;
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
      state.currentUserError = null;
      state.otherUserError = null;
    },
  },
});

export const {
  fetchCurrentUserInterviewsStart,
  fetchOtherUserInterviewsStart,
  fetchCurrentUserInterviewsSuccess,
  fetchOtherUserInterviewsSuccess,
  fetchCurrentUserInterviewsFailure,
  fetchOtherUserInterviewsFailure,
  createInterviewStart,
  createInterviewSuccess,
  createInterviewFailure,
  setCurrentInterview,
  startInterview,
  endInterview,
  clearInterviewError,
} = interviewSlice.actions;

export default interviewSlice.reducer;
