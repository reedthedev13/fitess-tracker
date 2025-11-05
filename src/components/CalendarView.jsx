import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function CalendarView({ workouts, onDateSelect }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { theme } = useTheme(); // 👈 access light/dark mode
  const [isDark, setIsDark] = useState(theme === "dark");

  // Keep local dark mode in sync with context theme
  useEffect(() => {
    setIsDark(theme === "dark");
  }, [theme]);

  const workoutDates = workouts.map((w) => new Date(w.date).toDateString());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month" && workoutDates.includes(date.toDateString())) {
      return "has-workout";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md p-6"
    >
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100 tracking-tight">
        Workout Calendar
      </h2>

      {/* react-calendar container */}
      <div
        className={`custom-calendar w-full p-2 rounded-xl border transition-all duration-300 ${
          isDark
            ? "bg-gray-900/40 border-gray-700 text-gray-200"
            : "bg-gray-50 border-gray-200 text-gray-800"
        }`}
      >
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileClassName={tileClassName}
          className="rounded-lg w-full bg-transparent [&_.react-calendar__tile]:transition-colors [&_.react-calendar__tile]:duration-200 [&_.react-calendar__tile:hover]:text-blue-600 dark:[&_.react-calendar__tile:hover]:text-blue-400"
        />
      </div>
    </motion.div>
  );
}
