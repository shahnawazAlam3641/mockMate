import { motion } from "motion/react";

const FinalAssessment = ({ assessment }: { assessment: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-primary-50 border border-primary-100 rounded-lg p-6 mt-8"
    >
      <h3 className="text-xl font-semibold text-primary-900 mb-4">
        Final Assessment
      </h3>

      <div className="prose prose-primary max-w-none text-primary-900">
        <p>{assessment}</p>
      </div>

      <div className="mt-6 flex justify-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white shadow-md rounded-lg p-4 max-w-md"
        >
          <h4 className="font-semibold text-gray-800 mb-2">What's Next?</h4>
          <p className="text-gray-600 text-sm">
            Based on this feedback, we recommend focusing on your areas for
            improvement while maintaining your strengths. Consider scheduling
            another practice interview in 1-2 weeks to measure your progress.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FinalAssessment;
