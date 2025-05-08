import { motion } from "motion/react";

const ScoreCard = ({ totalScore }: { totalScore: number }) => {
  const getColor = (score: number) => {
    if (score >= 90) return "from-success-500 to-success-600";
    if (score >= 75) return "from-primary-500 to-primary-600";
    if (score >= 60) return "from-secondary-500 to-secondary-600";
    if (score >= 40) return "from-warning-500 to-warning-600";
    return "from-error-500 to-error-600";
  };

  const getRating = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Very Good";
    if (score >= 60) return "Good";
    if (score >= 40) return "Average";
    return "Needs Improvement";
  };

  const scoreColor = getColor(totalScore);
  const rating = getRating(totalScore);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md p-6 text-center h-full flex flex-col justify-center"
    >
      <h3 className="text-xl font-semibold text-gray-700 mb-6">
        Overall Performance
      </h3>

      <div className="relative mb-6">
        <div className="w-40 h-40 mx-auto relative">
          <svg viewBox="0 0 36 36" className="w-full h-full">
            <path
              className="fill-current text-gray-200"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              strokeWidth="4"
              strokeDasharray="100, 100"
              fill="none"
            />

            <path
              className={`fill-current text-transparent stroke-current bg-gradient-to-r ${scoreColor}`}
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              strokeWidth="4"
              strokeDasharray={`${totalScore}, 100`}
              fill="none"
              style={{ strokeLinecap: "round" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-4xl font-bold text-gray-800">
              {totalScore}
            </span>
            <span className="text-sm text-gray-500">out of 100</span>
          </div>
        </div>
      </div>

      <div
        className={`py-2 px-4 rounded-full bg-gradient-to-r ${scoreColor} text-white font-medium inline-block mx-auto`}
      >
        {rating}
      </div>

      <p className="text-gray-600 mt-4">
        You performed {rating.toLowerCase()} in your interview. Review your
        detailed feedback below.
      </p>
    </motion.div>
  );
};

export default ScoreCard;
