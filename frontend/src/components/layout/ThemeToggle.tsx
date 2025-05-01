import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toggleTheme } from "../../redux/slices/themeSlice";
import { Moon, Sun } from "lucide-react";
import { useEffect, useRef } from "react";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.mode);
  const themeBtnRef = useRef<HTMLButtonElement>(null);

  const handleToggleTheme = () => {
    console.log(themeBtnRef.current?.classList.contains("dark"));

    if (document.body.classList.contains("dark")) {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
    dispatch(toggleTheme());
  };

  useEffect(() => {}, [theme]);

  return (
    <motion.button
      ref={themeBtnRef}
      id="toggleTheme"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => handleToggleTheme()}
      className="relative p-2 rounded-lg cursor-pointer bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="w-5 h-5 text-primary-600 dark:text-primary-400"
      >
        {theme === "dark" ? <Sun /> : <Moon />}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
