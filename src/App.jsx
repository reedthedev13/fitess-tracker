import { useState, useEffect } from "react";
import axios from "axios";
import FitnessForm from "./components/FitnessForm";
import AnalyticsDashboard from "./components/Analytics";
import "./index.css";
import Analytics from "./components/Analytics";
import WorkoutList from "./components/WorkoutList";
const API_URL = "http://localhost:8000";

export default function App() {
  const [workouts, setWorkouts] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetchWorkouts();
    fetchAnalytics();
  }, []);

  const fetchWorkouts = async () => {
    const response = await axios.get(`${API_URL}/workouts/`);
    setWorkouts(response.data);
  };

  const fetchAnalytics = async () => {
    const response = await axios.get(`${API_URL}/analytics/`);
    setAnalytics(response.data);
  };

  const addWorkout = async (workout) => {
    await axios.post(`${API_URL}/workouts/`, workout);
    fetchWorkouts();
    fetchAnalytics();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8">Fitness Tracker</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1">
          <FitnessForm onAdd={addWorkout} />
        </div>
        <div className="lg:col-span-2">
          <Analytics data={analytics} />
        </div>
      </div>
    </div>
  );
}
