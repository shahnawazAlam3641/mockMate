import { motion } from "motion/react";
import { ThumbsUp, AlertTriangle } from "lucide-react";

interface StrengthsAndImprovementsProps {
  strengths: string[];
  areasForImprovement: string[];
}

const StrengthsAndImprovements = ({
  strengths,
  areasForImprovement,
}: StrengthsAndImprovementsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
      {!(strengths.length === 0) && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-success-50 dark:bg-gray-900 border border-success-100 dark:border-gray-700 rounded-lg p-6"
        >
          <div className="flex items-center mb-4">
            <div className="bg-success-100 p-2 rounded-lg mr-3">
              <ThumbsUp className="h-5 w-5 text-success-700 dark:text-gray-900" />
            </div>
            <h3 className="text-xl font-semibold text-success-900 dark:text-white">
              Strengths
            </h3>
          </div>

          <ul className="space-y-3">
            {strengths.map((strength, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
                className="flex items-start"
              >
                <svg
                  className="h-5 w-5 text-success-600 dark:text-white mr-2 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-success-900 dark:text-white">
                  {strength}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-warning-50 dark:bg-gray-900 border border-warning-100 dark:border-gray-700 rounded-lg p-6"
      >
        <div className="flex items-center mb-4">
          <div className="bg-warning-100 p-2 rounded-lg mr-3">
            <AlertTriangle className="h-5 w-5 text-warning-700 dark:text-gray-900" />
          </div>
          <h3 className="text-xl font-semibold text-warning-900 dark:text-white">
            Areas for Improvement
          </h3>
        </div>

        <ul className="space-y-3">
          {areasForImprovement.map((area, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
              className="flex items-start"
            >
              <svg
                className="h-5 w-5 text-warning-600 dark:text-white mr-2 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-warning-900 dark:text-white">{area}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default StrengthsAndImprovements;
