import { motion } from "framer-motion";
import { Clock, Users, Code, Award } from "lucide-react";
import { Interview } from "../../redux/slices/interviewSlice";

interface InterviewCardProps {
  interview: Interview;
  onClick: () => void;
}

const InterviewCard = ({ interview, onClick }: InterviewCardProps) => {
  const {
    jobRole,
    experienceLevel,
    techStack,
    interviewType,
    numberOfQuestions,
  } = interview;

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "Technical":
        return "bg-secondary-100 text-secondary-800";
      case "Behavioural":
        return "bg-accent-100 text-accent-800";
      case "Mixed":
        return "bg-primary-100 text-primary-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getExperienceBadge = (level: string) => {
    switch (level) {
      case "Beginner":
        return {
          color: "bg-success-100 text-success-800",
          icon: <Award className="w-4 h-4 mr-1" />,
        };
      case "Intermediate":
        return {
          color: "bg-warning-100 text-warning-800",
          icon: <Award className="w-4 h-4 mr-1" />,
        };
      case "Advanced":
        return {
          color: "bg-error-100 text-error-800",
          icon: <Award className="w-4 h-4 mr-1" />,
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800",
          icon: <Award className="w-4 h-4 mr-1" />,
        };
    }
  };

  const experienceBadge = getExperienceBadge(experienceLevel);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="card overflow-hidden h-full flex flex-col"
    >
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 p-4">
        <div className="flex justify-between items-start">
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium ${getBadgeColor(
              interviewType
            )}`}
          >
            {interviewType}
          </span>
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium flex items-center ${experienceBadge.color}`}
          >
            {experienceBadge.icon} {experienceLevel}
          </span>
        </div>
        <h3 className="text-white text-xl font-bold mt-3 truncate">
          {jobRole}
        </h3>
      </div>

      <div className="p-4 flex-grow">
        <div className="flex flex-wrap gap-2 mb-4">
          {techStack.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-800 rounded-md text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            <span>Estimated time: {numberOfQuestions * 3} min</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2" />
            <span>1-on-1 Interview</span>
          </div>
          <div className="flex items-center">
            <Code className="w-4 h-4 mr-2" />
            <span>{numberOfQuestions} questions</span>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-100">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onClick}
          className="w-full btn btn-primary"
        >
          View Interview
        </motion.button>
      </div>
    </motion.div>
  );
};

export default InterviewCard;
