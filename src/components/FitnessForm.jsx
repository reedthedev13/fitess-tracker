import { useState } from "react";
import { addWorkout } from "../api/workoutService";

function FitnessForm({ onWorkoutAdded = () => {} }) {
  const [workout, setWorkout] = useState({
    type: "strength",
    date: new Date().toISOString().split("T")[0],
    reps: 10,
    sets: 3,
    weight: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkout((prev) => ({
      ...prev,
      [name]:
        name === "reps" || name === "sets" || name === "weight"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addWorkout({
        ...workout,
        weight: workout.weight || null,
      });
      onWorkoutAdded(result);

      setWorkout({
        type: "strength",
        date: new Date().toISOString().split("T")[0],
        reps: 10,
        sets: 3,
        weight: "",
      });
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-sm p-6 space-y-6 max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Log New Workout</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
            Workout Type
          </label>
          <select
            id="type"
            name="type"
            value={workout.type}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          >
            <option value="strength">Strength Training</option>
            <option value="cardio">Cardio</option>
            <option value="hiit">HIIT</option>
            <option value="yoga">Yoga</option>
            <option value="calisthenics">Calisthenics</option>
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={workout.date}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="sets"
            className="block text-sm font-medium text-gray-700"
          >
            Sets
          </label>
          <input
            type="number"
            id="sets"
            name="sets"
            min="1"
            value={workout.sets}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="reps"
            className="block text-sm font-medium text-gray-700"
          >
            Reps
          </label>
          <input
            type="number"
            id="reps"
            name="reps"
            min="1"
            value={workout.reps}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="weight"
            className="block text-sm font-medium text-gray-700"
          >
            Weight (kg)
            <span className="text-gray-400 ml-1 text-sm">optional</span>
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            min="0"
            step="0.5"
            value={workout.weight}
            onChange={handleChange}
            placeholder="Enter weight"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm hover:shadow-md"
      >
        Save Workout
      </button>
    </form>
  );
}

export default FitnessForm;
