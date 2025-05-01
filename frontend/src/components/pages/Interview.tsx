import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "motion/react";
import { RootState } from "../../redux/store";
import {
  endInterview,
  setCurrentInterview,
  startInterview,
} from "../../redux/slices/interviewSlice";
import InterviewBox from "../interview/InterviewBox";
import SubtitlesArea from "../interview/SubtitlesArea";
import ControlPanel from "../interview/ControlPanel";

const Interview = () => {
  const { id } = useParams<{ id: string }>();
  const { currentInterview, loading, error } = useSelector(
    (state: RootState) => state.interview
  );

  const [interviewStarted, setInterviewStarted] = useState(false);
  const [interviewComplete, setInterviewComplete] = useState(false);
  const [activeSpeaker, setActiveSpeaker] = useState<
    "interviewer" | "interviewee" | null
  >(null);
  const [currentSubtitle, setCurrentSubtitle] = useState<string>("");
  const [transcription, setTranscription] = useState<string[]>([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const loadInterview = async () => {
      try {
        if (id) {
          const interview = await fetchInterview(id);
          dispatch(setCurrentInterview(interview));
        }
      } catch (error) {
        console.error("Failed to fetch interview:", error);
      }
    };

    loadInterview();

    return () => {
      if (interviewStarted && !interviewComplete) {
        //cleanup for incomplete interviews
      }
    };
  }, [id]);

  const handleStartInterview = () => {
    dispatch(startInterview());
    setInterviewStarted(true);
    simulateInterview();
  };

  const handleEndInterview = async () => {
    try {
      dispatch(endInterview());
      setInterviewComplete(true);
      setActiveSpeaker(null);

      if (id) {
        await completeInterview(id, transcription);
        navigate(`/feedback/${id}`);
      }
    } catch (error) {
      console.error("Failed to complete interview:", error);
    }
  };

  if (loading && !currentInterview) {
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

  if (!currentInterview) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-warning-100 text-warning-800 p-4 rounded-md max-w-md text-center">
          <h3 className="font-bold text-lg mb-2">Interview Not Found</h3>
          <p>
            The interview you requested could not be found. Please check the URL
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white shadow-md rounded-xl overflow-hidden">
            <div className="p-6 bg-primary-900 text-white">
              <h1 className="text-2xl font-bold font-heading">
                {currentInterview.jobRole} Interview
              </h1>
              <p className="text-primary-200">
                {currentInterview.interviewType} •{" "}
                {currentInterview.experienceLevel} •{" "}
                {currentInterview.numberOfQuestions} Questions
              </p>
            </div>

            <div className="p-6">
              {interviewStarted ? (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InterviewBox
                      type="interviewer"
                      isActive={activeSpeaker === "interviewer"}
                      name="AI Interviewer"
                      avatarUrl="https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    />

                    <InterviewBox
                      type="interviewee"
                      isActive={activeSpeaker === "interviewee"}
                      name="You"
                      avatarUrl="https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    />
                  </div>

                  <SubtitlesArea
                    currentSubtitle={currentSubtitle}
                    activeSpeaker={activeSpeaker}
                  />

                  <ControlPanel
                    onEndInterview={handleEndInterview}
                    isComplete={interviewComplete}
                  />
                </div>
              ) : (
                <div className="text-center py-10">
                  <h3 className="text-xl font-semibold mb-4">
                    Ready to begin your interview?
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                    We'll simulate a real interview experience with our AI
                    interviewer. Your responses will be evaluated and you'll
                    receive detailed feedback.
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStartInterview}
                    className="btn btn-primary px-8 py-3"
                  >
                    Start Interview
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Interview;
