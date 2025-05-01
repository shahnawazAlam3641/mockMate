import React from "react";
import { motion, AnimatePresence } from "motion/react";

interface SubtitlesAreaProps {
  currentSubtitle: string;
  activeSpeaker: "interviewer" | "interviewee" | null;
}

const SubtitlesArea = ({
  currentSubtitle,
  activeSpeaker,
}: SubtitlesAreaProps) => {
  return (
    <div className="w-full border border-gray-200 bg-white rounded-lg p-4 min-h-[100px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        {activeSpeaker && (
          <motion.div
            key={currentSubtitle}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <p className="text-sm text-gray-500 mb-1">
              {activeSpeaker === "interviewer" ? "AI Interviewer" : "You"} is
              speaking:
            </p>
            <p
              className={`text-lg ${
                activeSpeaker === "interviewer"
                  ? "text-primary-700"
                  : "text-secondary-700"
              }`}
            >
              {currentSubtitle}
            </p>
          </motion.div>
        )}
        {!activeSpeaker && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-400"
          >
            Waiting for the interview to begin...
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubtitlesArea;
