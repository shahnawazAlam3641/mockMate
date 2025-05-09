import { motion } from "motion/react";

interface InterviewBoxProps {
  type: "interviewer" | "interviewee";
  isActive: boolean;
  name: string;
  avatarUrl: string;
}

const InterviewBox = ({
  type,
  isActive,
  name,
  avatarUrl,
}: InterviewBoxProps) => {
  return (
    <div
      className={` rounded-lg flex flex-col items-center justify-center py-8 px-4 border-2 border-gray-200 dark:border-gray-700`}
    >
      <div className="relative">
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 opacity-30 animate-pulse-slow"
            style={{ transform: "scale(1.2)" }}
          />
        )}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg"
        >
          <img
            src={avatarUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {isActive && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -bottom-2 -right-2 bg-accent-500 text-white rounded-full p-2 shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          </motion.div>
        )}
      </div>

      <h3 className="mt-4 text-xl font-semibold">{name}</h3>
      <p className="text-gray-600">
        {type === "interviewer" ? "AI Interviewer" : "Candidate"}
      </p>

      <div
        className={`mt-4 w-full max-w-xs p-3 rounded-md border border-gray-200 dark:border-gray-700`}
      >
        <div className="flex items-center justify-center space-x-2">
          <div
            className={`w-3 h-3 rounded-full ${
              isActive ? "bg-accent-500" : "bg-gray-400"
            }`}
          ></div>
          <span className="text-sm font-medium">
            {isActive ? "Speaking" : "Waiting"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InterviewBox;
