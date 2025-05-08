import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "motion/react";
import { RootState } from "../../redux/store";
import {
  setCurrentInterview,
  setCurrentInterviewError,
  setCurrentInterviewLoading,
} from "../../redux/slices/interviewSlice";
import InterviewBox from "../interview/InterviewBox";
import SubtitlesArea from "../interview/SubtitlesArea";
import ControlPanel from "../interview/ControlPanel";
import { Message } from "../../types/vapi";
import { vapi } from "../../utils/vapi";
import { BACKEND_URL, interviewer } from "../../utils/constants";
import axios from "axios";
import {
  fetchFeedbackFailure,
  fetchFeedbackStart,
  fetchFeedbackSuccess,
} from "../../redux/slices/feedbackSlice";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const Interview = ({ type }: { type: string }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const { user } = useSelector((state: RootState) => state.auth);

  const { id } = useParams<{ id: string }>();
  const { currentInterview, currentInterviewLoading, currentInterviewError } =
    useSelector((state: RootState) => state.interview);

  const { loading } = useSelector((state: RootState) => state.feedback);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = {
          role: message.role,
          content: message.transcript,
        };

        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onError = (error: Error) => {
      console.log("Error: ", error);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  useEffect(() => {
    const handleGenerateFeedback = async (messages: SavedMessage[]) => {
      try {
        dispatch(fetchFeedbackStart());

        const response = await axios.post(
          `${BACKEND_URL}/feedback/generate`,
          { interviewId: currentInterview?._id, transcript: messages },
          { headers: { Authorisation: `Bearer ${user?.token}` } }
        );

        dispatch(fetchFeedbackSuccess(response.data.feedback));
        navigate(`/feedback/${response.data.feedback._id}`);
      } catch (error) {
        console.log(error);
        dispatch(fetchFeedbackFailure((error as Error).message));
      }
    };

    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        navigate("/");
      } else if (type === "interview") {
        handleGenerateFeedback(messages);
      }
    }
  }, [messages, callStatus, type, user?._id]);

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        dispatch(setCurrentInterviewLoading(true));
        const response = await axios.get(`${BACKEND_URL}/interview/get/${id}`, {
          headers: { Authorisation: `Bearer ${user?.token}` },
        });

        dispatch(setCurrentInterview(response.data.interview));
        dispatch(setCurrentInterviewLoading(false));
        dispatch(setCurrentInterviewError(null));
      } catch (error) {
        dispatch(setCurrentInterviewLoading(false));
        dispatch(setCurrentInterviewError((error as Error).message));
        console.log(error);
      }
    };
    if (!currentInterview && user?.token) {
      fetchInterview();
    }
  }, [currentInterview, user?.token]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    if (type === "generate") {
      await vapi.start(import.meta.env.VITE_VAPI_ASSISTANT_ID, {
        variableValues: {
          username: user?.name,
          userid: user?._id,
        },
      });
    } else if (type === "interview") {
      let formattedQuestions = "";

      if (currentInterview?.questions) {
        formattedQuestions = currentInterview?.questions
          .map((question) => {
            return `- ${question}`;
          })
          .join("\n");
      }

      await vapi.start(interviewer, {
        variableValues: {
          questions: formattedQuestions,
        },
      });
    }

    setCallStatus(CallStatus.ACTIVE);
  };

  const handleDisconnect = async () => {
    setCallStatus(CallStatus.FINISHED);

    vapi.stop();
  };

  const isCallInactiveOrFinished =
    callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED;

  if (currentInterviewLoading || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (currentInterviewError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-error-100 text-error-800 p-4 rounded-md max-w-md text-center">
          <h3 className="font-bold text-lg mb-2">Error</h3>
          <p>{currentInterviewError}</p>
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
                {currentInterview?.jobRole} Interview
              </h1>
              <p className="text-primary-200">
                {currentInterview?.interviewType} •{" "}
                {currentInterview?.experienceLevel} •{" "}
                {currentInterview?.numberOfQuestions} Questions
              </p>
            </div>

            <div className="p-6">
              {callStatus === CallStatus.ACTIVE ? (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InterviewBox
                      type="interviewer"
                      isActive={isSpeaking}
                      name="AI Interviewer"
                      avatarUrl="https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    />

                    <InterviewBox
                      type="interviewee"
                      isActive={!isSpeaking}
                      name="You"
                      avatarUrl="https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    />
                  </div>

                  <SubtitlesArea
                    currentSubtitle={messages[messages.length - 1]?.content}
                    isSpeaking={isSpeaking}
                  />

                  <ControlPanel
                    onEndInterview={handleDisconnect}
                    isComplete={callStatus === CallStatus.FINISHED}
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
                    onClick={handleCall}
                    className="btn btn-primary px-8 py-3"
                    disabled={callStatus === CallStatus.CONNECTING}
                  >
                    {callStatus === CallStatus.CONNECTING
                      ? "Starting..."
                      : "Start Interview "}
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
