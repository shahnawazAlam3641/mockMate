import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "motion/react";
import { RootState } from "../../redux/store";

import Hero from "../home/Hero";
import InterviewCard from "../home/InterviewCard";
import CreateInterviewModal from "../home/CreateInterviewModal";
import LoginPromptModal from "../home/LoginPromptModal";
import {
  fetchCurrentUserInterviewsFailure,
  fetchCurrentUserInterviewsStart,
  fetchCurrentUserInterviewsSuccess,
  fetchOtherUserInterviewsFailure,
  fetchOtherUserInterviewsStart,
  fetchOtherUserInterviewsSuccess,
  setCurrentInterview,
} from "../../redux/slices/interviewSlice";
import axios from "axios";
import { BACKEND_URL } from "../../utils/constants";

const Home: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const {
    currentUserInterviews,
    otherUserInterviews,
    otherUserLoading,
    otherUserError,
  } = useSelector((state: RootState) => state.interview);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getCurrentUserInterviews = async () => {
    try {
      dispatch(fetchCurrentUserInterviewsStart());

      const response = await axios.get(
        `${BACKEND_URL}/interview/getUserInterviews`,
        { headers: { Authorisation: `Bearer ${user?.token}` } }
      );
      dispatch(fetchCurrentUserInterviewsSuccess(response.data.interviews));
    } catch (error) {
      dispatch(fetchCurrentUserInterviewsFailure((error as Error).message));
    }
  };

  const getAllInterviews = async () => {
    try {
      dispatch(fetchOtherUserInterviewsStart());

      const response = await axios.post(
        `${BACKEND_URL}/interview/getAll`,
        { userId: user?._id },
        {
          headers: { Authorisation: `Bearer ${user?.token}` },
        }
      );

      dispatch(fetchOtherUserInterviewsSuccess(response.data.interviews));
    } catch (error) {
      dispatch(fetchOtherUserInterviewsFailure((error as Error).message));
    }
  };

  useEffect(() => {
    if (user?.token && !(currentUserInterviews.length > 0)) {
      getCurrentUserInterviews();
    }

    if (!(otherUserInterviews.length > 0)) {
      getAllInterviews();
    }
  }, [user?.token]);

  const handleCreateInterview = () => {
    if (isAuthenticated) {
      setIsCreateModalOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen">
      <Hero onCreateInterview={handleCreateInterview} />

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {isAuthenticated && currentUserInterviews.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6 dark:text-white">
              Your Interviews
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentUserInterviews.map((interview) => (
                <motion.div
                  key={interview?._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <InterviewCard
                    interview={interview}
                    onClick={() => {
                      dispatch(setCurrentInterview(interview));
                      navigate(`/interview/${interview?._id}`);
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6 dark:text-white">
            {isAuthenticated ? "Interviews by Others" : "Popular Interviews"}
          </h2>
          {otherUserLoading ? (
            <div className="flex justify-center">
              <div className="loader"></div>
            </div>
          ) : otherUserError ? (
            <div className="text-center text-error-600">{otherUserError}</div>
          ) : otherUserInterviews.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherUserInterviews.map((interview) => (
                <motion.div
                  key={interview?._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <InterviewCard
                    interview={interview}
                    onClick={() => {
                      if (isAuthenticated) {
                        dispatch(setCurrentInterview(interview));
                        navigate(`/interview/${interview?._id}`);
                      } else {
                        setIsLoginModalOpen(true);
                      }
                    }}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 dark:text-white">
              No interviews available.
            </div>
          )}
        </div>
      </section>

      {isCreateModalOpen && (
        <CreateInterviewModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}

      {isLoginModalOpen && (
        <LoginPromptModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Home;
