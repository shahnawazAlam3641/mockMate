import React from "react";
import { motion } from "framer-motion";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";

interface ControlPanelProps {
  onEndInterview: () => void;
  isComplete: boolean;
}

const ControlPanel = ({ onEndInterview, isComplete }: ControlPanelProps) => {
  const [isMuted, setIsMuted] = React.useState(false);
  const [isVideoOff, setIsVideoOff] = React.useState(false);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-4  rounded-lg">
      <div className="flex space-x-3 mb-4 md:mb-0">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMuted(!isMuted)}
          className={`p-3 rounded-full ${
            isMuted
              ? "bg-error-100 text-error-600"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
        >
          {isMuted ? (
            <MicOff className="h-5 w-5" />
          ) : (
            <Mic className="h-5 w-5" />
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsVideoOff(!isVideoOff)}
          className={`p-3 rounded-full ${
            isVideoOff
              ? "bg-error-100 text-error-600"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
        >
          {isVideoOff ? (
            <VideoOff className="h-5 w-5" />
          ) : (
            <Video className="h-5 w-5" />
          )}
        </motion.button>
      </div>

      <div className="flex space-x-3">
        {!isComplete && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEndInterview}
            className="btn bg-error-600 hover:bg-error-700 text-white"
          >
            End Interview
          </motion.button>
        )}

        {isComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-success-100 text-success-800 px-4 py-2 rounded-md flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Interview Complete
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ControlPanel;
