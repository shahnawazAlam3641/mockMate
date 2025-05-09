import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "motion/react";
import { RootState } from "../../redux/store";
import {
  fetchFeedbackFailure,
  fetchFeedbackStart,
  fetchFeedbackSuccess,
} from "../../redux/slices/feedbackSlice";
import axios from "axios";
import { BACKEND_URL } from "../../utils/constants";
import FeedbackHeader from "../feedback/FeedbackHeader";
import ScoreCard from "../feedback/ScoreCard";
import CategoryScore from "../feedback/CategoryScore";
import StrengthsAndImprovements from "../feedback/StrengthsAndImprovements";
import FinalAssessment from "../feedback/FinalAssessment";

const Feedback = () => {
  const { id } = useParams<{ id: string }>();
  const { feedback, loading, error } = useSelector(
    (state: RootState) => state.feedback
  );
  const { user } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const loadFeedback = async () => {
      try {
        dispatch(fetchFeedbackStart());
        if (id) {
          const response = await axios.get(
            `${BACKEND_URL}/feedback/get/${id}`,
            {
              headers: { Authorisation: `Bearer ${user?.token}` },
            }
          );

          console.log(response);

          dispatch(fetchFeedbackSuccess(response.data.feedback));
        }
      } catch (error) {
        dispatch(fetchFeedbackFailure((error as Error).message));
      }
    };

    if (user?.token) {
      loadFeedback();
    }
  }, [id, user?.token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-error-100 text-error-800 p-4 rounded-md max-w-md text-center">
          <h3 className="font-bold text-lg mb-2">Error</h3>
          <p>{error}</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 btn btn-primary"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  if (!feedback) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-warning-100 text-warning-800 p-4 rounded-md max-w-md text-center">
          <h3 className="font-bold text-lg mb-2">Feedback Not Found</h3>
          <p>
            The feedback you requested could not be found. Please check the URL
            and try again.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 btn btn-primary"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className=" shadow-md dark:border border-gray-700 rounded-xl overflow-hidden">
            <FeedbackHeader />

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="md:col-span-1">
                  <ScoreCard totalScore={feedback.totalScore} />
                </div>

                <div className="md:col-span-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {feedback.categoryScores.map((category, index) => (
                      <motion.div
                        key={category.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                      >
                        <CategoryScore
                          name={category.name}
                          score={category.score}
                          comment={category.comment}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <StrengthsAndImprovements
                strengths={feedback.strengths}
                areasForImprovement={feedback.areasForImprovement}
              />

              <FinalAssessment assessment={feedback.finalAssessment} />

              <div className="mt-8 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/")}
                  className="btn btn-primary px-8 py-3"
                >
                  Return to Home
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Feedback;
