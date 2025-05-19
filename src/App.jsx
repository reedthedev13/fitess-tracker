import { useState, useEffect } from "react";
import axios from "axios";
import FitnessForm from "./components/FitnessForm";
import "./index.css";
import Analytics from "./components/Analytics";
import WorkoutList from "./components/WorkoutList";

const API_URL = "http://localhost:8000";

export default function App() {
  const [workouts, setWorkouts] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Add error states
  const [workoutError, setWorkoutError] = useState(null);
  const [analyticsError, setAnalyticsError] = useState(null);

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
  }, [refreshTrigger]); // Trigger on refresh

  const handleWorkoutAdded = () => {
    setRefreshTrigger((prev) => prev + 1); // Force refresh all data
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Fitness Tracker</h1>

      {/* Error Display */}
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
          <WorkoutList workouts={workouts} />
        </div>
      </div>
    </div>
  );
}
