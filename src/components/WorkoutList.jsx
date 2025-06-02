import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "https://fitness-tracker-backend-1-e203.onrender.com";

export default function WorkoutList({ workouts, onDelete }) {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this workout?")) {
      try {
        const response = await axios.delete(`${API_URL}/workouts/${id}`);

        if (response.data.status === "success") {
          onDelete(id);
        }
      } catch (error) {
        console.error(
          "Delete failed:",
          error.response?.data?.detail || error.message
        );
        alert(
          `Delete failed: ${error.response?.data?.detail || "Server error"}`
        );
      }
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Workout History</h2>
      {workouts.length === 0 ? (
        <p className="text-gray-500">No workouts recorded yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <div
              key={workout.id}
              className="bg-white p-4 rounded-lg shadow relative"
            >
              <button
                onClick={() => handleDelete(workout.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                aria-label="Delete workout"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <h3 className="font-semibold text-lg capitalize">
                {workout.type}
              </h3>
              <p className="text-gray-600">
                Date: {new Date(workout.date).toLocaleDateString()}
              </p>
              <p className="text-gray-600">Sets: {workout.sets}</p>
              <p className="text-gray-600">Reps: {workout.reps}</p>
              {workout.weight && (
                <p className="text-gray-600">Weight: {workout.weight} kg</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
