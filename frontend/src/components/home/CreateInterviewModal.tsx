import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { X,  FileText } from "lucide-react";
import {
  createInterviewStart,
  createInterviewSuccess,
  createInterviewFailure,
  ExperienceLevel,
  InterviewType,
} from "../../redux/slices/interviewSlice";
import axios from "axios";
import { BACKEND_URL } from "../../utils/constants";
import { RootState } from "../../redux/store";

interface CreateInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ModalStep = "selection" | "form" | "chat";

const CreateInterviewModal: React.FC<CreateInterviewModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [step, setStep] = useState<ModalStep>("selection");
  const [formData, setFormData] = useState({
    jobRole: "",
    experienceLevel: ExperienceLevel.Intermediate,
    techStack: "",
    interviewType: InterviewType.Technical,
    numberOfQuestions: 5,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "numberOfQuestions" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      dispatch(createInterviewStart());

      const response = await axios.post(
        `${BACKEND_URL}/interview/generateInterview`,
        { ...formData, userid: user?._id },
        {
          headers: {
            Authorisation: `Bearer ${user?.token}`,
          },
        }
      );

      dispatch(createInterviewSuccess(response.data.interview));
      onClose();
      navigate(`/interview/${response.data.interview._id}`);
    } catch (err) {
      const errorMessage =
        (err as Error).message || "Failed to create interview";
      setError(errorMessage);
      dispatch(createInterviewFailure(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-[#000000f0] bg-opacity-50 z-40"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-3xl w-full"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Create New Interview
                </h3>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              <div className="p-6">
                {step === "selection" && (
                  <div className="space-y-6">
                    <p className="text-gray-600 dark:text-gray-300">
                      How would you like to create your interview?
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setStep("form")}
                        className="flex flex-col items-center justify-center p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20"
                      >
                        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-3">
                          <FileText className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                        </div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Fill a Form
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
                          Create a customized interview by filling out a form
                        </p>
                      </motion.button>

                      {/* future update */}
                      {/* <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setStep("chat")}
                        className="flex flex-col items-center justify-center p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20"
                      >
                        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-3">
                          <MessageCircle className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                        </div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Chat with AI
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
                          Let our AI help you build your interview
                        </p>
                      </motion.button> */}
                    </div>
                  </div>
                )}

                {step === "form" && (
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="jobRole" className="label">
                          Job Role
                        </label>
                        <input
                          type="text"
                          id="jobRole"
                          name="jobRole"
                          value={formData.jobRole}
                          onChange={handleChange}
                          placeholder="e.g. Frontend Developer"
                          className="input"
                          required
                        />
                      </div>

                      <div>
                        <label className="label">Experience Level</label>
                        <div className="grid grid-cols-3 gap-2">
                          {Object.values(ExperienceLevel).map((level) => (
                            <label
                              key={level}
                              className={`flex items-center justify-center px-4 py-2 border rounded-md cursor-pointer transition-colors ${
                                formData.experienceLevel === level
                                  ? "bg-primary-100 dark:bg-primary-900 border-primary-500 dark:border-primary-400 text-primary-700 dark:text-primary-300"
                                  : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                              }`}
                            >
                              <input
                                type="radio"
                                name="experienceLevel"
                                value={level}
                                checked={formData.experienceLevel === level}
                                onChange={() =>
                                  setFormData({
                                    ...formData,
                                    experienceLevel: level as ExperienceLevel,
                                  })
                                }
                                className="sr-only"
                              />
                              {level}
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="techStack" className="label">
                          Tech Stack (comma separated)
                        </label>
                        <input
                          type="text"
                          id="techStack"
                          name="techStack"
                          value={formData.techStack}
                          onChange={handleChange}
                          placeholder="e.g. React, TypeScript, Node.js"
                          className="input"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="interviewType" className="label">
                          Interview Type
                        </label>
                        <select
                          id="interviewType"
                          name="interviewType"
                          value={formData.interviewType}
                          onChange={handleChange}
                          className="input"
                        >
                          {Object.values(InterviewType).map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="numberOfQuestions" className="label">
                          Number of Questions
                        </label>
                        <input
                          type="number"
                          id="numberOfQuestions"
                          name="numberOfQuestions"
                          value={formData.numberOfQuestions}
                          onChange={handleChange}
                          min={1}
                          max={20}
                          className="input"
                          required
                        />
                      </div>

                      {error && (
                        <div className="alert alert-error">{error}</div>
                      )}

                      <div className="flex justify-end space-x-3 pt-3">
                        <button
                          type="button"
                          onClick={() => setStep("selection")}
                          className="btn btn-outline"
                          disabled={loading}
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={loading}
                        >
                          {loading ? "Creating..." : "Create Interview"}
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                {step === "chat" && (
                  <div className="space-y-6">{/* <ChatWithAI /> */}</div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CreateInterviewModal;
