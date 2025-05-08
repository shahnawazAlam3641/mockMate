import { motion } from "motion/react";

interface CategoryScoreProps {
  name: string;
  score: number;
  comment: string;
}

const CategoryScore = ({ name, score, comment }: CategoryScoreProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-success-500";
    if (score >= 75) return "bg-primary-500";
    if (score >= 60) return "bg-secondary-500";
    if (score >= 40) return "bg-warning-500";
    return "bg-error-500";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 h-full">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-lg font-semibold text-gray-800">{name}</h4>
        <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
          <div
            className={`w-3 h-3 rounded-full ${getScoreColor(score)} mr-2`}
          ></div>
          <span className="font-medium">{score}/100</span>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, delay: 0.3 }}
          className={`h-2 rounded-full ${getScoreColor(score)}`}
        ></motion.div>
      </div>

      <p className="text-gray-600 text-sm">{comment}</p>
    </div>
  );
};

export default CategoryScore;
