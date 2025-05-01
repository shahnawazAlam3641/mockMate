import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "motion/react";
import { RootState } from "../../redux/store";
import {
  fetchInterviewsFailure,
  fetchInterviewsStart,
  fetchInterviewsSuccess,
} from "../../redux/slices/interviewSlice";
import Hero from "../home/Hero";
import InterviewCard from "../home/InterviewCard";
import CreateInterviewModal from "../home/CreateInterviewModal";
import LoginPromptModal from "../home/LoginPromptModal";

const Home: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { interviews, loading, error } = useSelector(
    (state: RootState) => state.interview
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const loadInterviews = async () => {
      try {
        dispatch(fetchInterviewsStart());
        const data = await fetchInterviews();
        dispatch(fetchInterviewsSuccess(data));
      } catch (error) {
        dispatch(fetchInterviewsFailure((error as Error).message));
      }
    };

    loadInterviews();
  }, []);

  const handleCreateInterview = () => {
    if (isAuthenticated) {
      setIsCreateModalOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const userInterviews = interviews.filter(
    (interview) => isAuthenticated && interview.createdBy === "currentUser"
  );

  const otherInterviews = interviews.filter(
    (interview) =>
      interview.isPublic &&
      (!isAuthenticated || interview.createdBy !== "currentUser")
  );

  return (
    <div className="min-h-screen">
      <Hero onCreateInterview={handleCreateInterview} />

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {isAuthenticated && userInterviews.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
              Your Interviews
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {userInterviews.map((interview) => (
                <motion.div
                  key={interview.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <InterviewCard
                    interview={interview}
                    onClick={() => navigate(`/interview/${interview.id}`)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
            {isAuthenticated ? "Interviews by Others" : "Popular Interviews"}
          </h2>
          {loading ? (
            <div className="flex justify-center">
              <div className="loader"></div>
            </div>
          ) : error ? (
            <div className="text-center text-error-600">{error}</div>
          ) : otherInterviews.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherInterviews.map((interview) => (
                <motion.div
                  key={interview.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <InterviewCard
                    interview={interview}
                    onClick={() => {
                      if (isAuthenticated) {
                        navigate(`/interview/${interview.id}`);
                      } else {
                        setIsLoginModalOpen(true);
                      }
                    }}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">
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
