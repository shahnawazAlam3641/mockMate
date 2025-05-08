import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import authReducer from "./slices/authSlice";
import interviewReducer from "./slices/interviewSlice";
import feedbackReducer from "./slices/feedbackSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    interview: interviewReducer,
    feedback: feedbackReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
