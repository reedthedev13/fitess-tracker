import { useState, useEffect } from "react";
import axios from "axios";
import FitnessForm from "./components/FitnessForm";
import "./index.css";
import Analytics from "./components/Analytics";
import WorkoutList from "./components/WorkoutList";
import DarkModeToggle from "./components/DarkModeToggle";

const API_URL = "http://127.0.0.1:8000";

export default function App() {
  const [workouts, setWorkouts] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [workoutError, setWorkoutError] = useState(null);
  const [analyticsError, setAnalyticsError] = useState(null);

  const handleDeleteWorkout = (deletedId) => {
    setWorkouts((prev) => prev.filter((workout) => workout.id !== deletedId));
    setRefreshTrigger((prev) => prev + 1);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const workoutsResponse = await axios.get(`${API_URL}/workouts/`);
        setWorkouts(workoutsResponse.data);
        setWorkoutError(null);

        const analyticsResponse = await axios.get(`${API_URL}/analytics/`);
        setAnalytics(analyticsResponse.data);
        setAnalyticsError(null);
      } catch (err) {
        setWorkoutError("Failed to load workouts");
        setAnalyticsError("Failed to load analytics");
      }
    };

    fetchData();
  }, [refreshTrigger]);

  const handleWorkoutAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8 transition-colors">
      {/* Header with Dark Mode Toggle */}
      <header className="flex justify-between items-center mb-8 border-b border-gray-300 dark:border-gray-700 pb-3">
        <h1 className="flex items-center text-2xl font-semibold text-gray-900 dark:text-white tracking-wide space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 17v-6h6v6m-9 2h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span>Fitness Tracker</span>
        </h1>

        <DarkModeToggle />
      </header>

      {workoutError && <div className="text-red-500 mb-4">{workoutError}</div>}
      {analyticsError && (
        <div className="text-red-500 mb-4">{analyticsError}</div>
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <FitnessForm onWorkoutAdded={handleWorkoutAdded} />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Analytics data={analytics} />
          <WorkoutList workouts={workouts} onDelete={handleDeleteWorkout} />
        </div>
      </div>
    </div>
  );
}
