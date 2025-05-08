import { motion } from "motion/react";
import { Award } from "lucide-react";

const FeedbackHeader = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800 opacity-90"></div>

      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white bg-opacity-10 rounded-full"></div>
      <div className="absolute top-3/4 -left-5 w-20 h-20 bg-white bg-opacity-10 rounded-full"></div>

      <div className="relative px-6 py-10 sm:px-10 sm:py-16 text-center">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-4"
        >
          <div className="p-3 bg-white bg-opacity-20 rounded-xl">
            <Award className="h-10 w-10 text-white" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl font-heading font-bold text-white sm:text-4xl"
        >
          Your Interview Feedback
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-2 text-primary-100 max-w-2xl mx-auto"
        >
          Below is a comprehensive analysis of your interview performance with
          detailed scores, strengths, and areas for improvement to help you
          prepare better for your next interview.
        </motion.p>
      </div>
    </div>
  );
};

export default FeedbackHeader;
