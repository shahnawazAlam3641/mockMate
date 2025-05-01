import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Cpu } from "lucide-react";

interface HeroProps {
  onCreateInterview: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCreateInterview }) => {
  return (
    <div className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary-500 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-72 h-72 bg-accent-500 opacity-10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center mb-6"
            >
              <div className="bg-white bg-opacity-10 p-3 rounded-lg">
                <Cpu className="w-6 h-6 text-primary-200" />
              </div>
              <h3 className="ml-3 text-lg font-medium text-primary-100">
                AI-Powered Practice
              </h3>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6"
            >
              Crack Interviews with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-accent-400">
                AI Precision
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg text-primary-100 mb-8 max-w-lg"
            >
              Practice with our AI interviewer and get instant feedback to
              improve your skills. Tailored for technical and behavioral
              interviews across all experience levels.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onCreateInterview}
                className="btn bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-md flex items-center justify-center"
              >
                Create Interview
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>
              <button className="btn bg-transparent border border-primary-200 text-white hover:bg-white hover:bg-opacity-10 px-8 py-3 rounded-md">
                Learn More
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden lg:block"
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl bg-gray-800 aspect-video">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-800/50 to-gray-900/90 z-10"></div>
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-accent-500 flex items-center justify-center">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5 3L19 12L5 21V3Z" fill="white" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">
                    See How It Works
                  </h3>
                  <p className="text-primary-200">Watch a 2-minute demo</p>
                </div>
              </div>
              <img
                src=""
                alt="Interview demonstration"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="bg-primary-950 bg-opacity-50 backdrop-blur-sm border-t border-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-white mb-1">5,000+</div>
              <div className="text-primary-300">Interviews Conducted</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">93%</div>
              <div className="text-primary-300">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">250+</div>
              <div className="text-primary-300">Tech Skills Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-primary-300">AI Availability</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
