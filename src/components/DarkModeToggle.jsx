import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
import useDarkMode from "../hooks/useDarkMode";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useDarkMode();

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-lg border border-gray-300 dark:border-gray-600
                 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle dark mode"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SunIcon className="h-5 w-5 text-yellow-400" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MoonIcon className="h-5 w-5 text-gray-700" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
