import React, { useState } from "react";
import { motion } from "framer-motion";

export default function WorkoutList({ workouts = [], onDelete }) {
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    setLoadingDelete(true);
    setError(null);

    try {
      const response = await fetch(
        `https://fitness-tracker-backend-1-e203.onrender.com/workouts/${id}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        onDelete(id);
        setConfirmDeleteId(null);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.detail || "Unknown error deleting workout.");
      }
    } catch (err) {
      setError(err.message || "Error deleting workout.");
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md transition-colors"
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Workout List
      </h2>

      {workouts.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          No workouts yet. Add your first one!
        </p>
      ) : (
        <ul className="space-y-3">
          {workouts.map((workout) => (
            <li
              key={workout.id}
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 
                         bg-gray-50 dark:bg-gray-900 
                         text-gray-800 dark:text-gray-200
                         flex justify-between items-start
                         transition-colors relative"
            >
              <div>
                <span className="font-medium capitalize">{workout.type}</span> —{" "}
                <span>
                  {workout.sets} sets × {workout.reps} reps
                </span>
                {workout.weight != null && <span> — {workout.weight} lb</span>}
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Date: {new Date(workout.date).toLocaleDateString()}
                </div>
              </div>

              <button
                onClick={() => setConfirmDeleteId(workout.id)}
                className="ml-4 text-red-600 hover:text-red-800 font-semibold"
                aria-label={`Delete workout ${workout.type}`}
              >
                Delete
              </button>

              {/* Inline Delete Confirmation Modal */}
              {confirmDeleteId === workout.id && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-80">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      Are you sure?
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      This will permanently delete your workout.
                    </p>

                    {error && (
                      <p className="text-red-500 text-sm mb-2">{error}</p>
                    )}

                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setConfirmDeleteId(null)}
                        className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 transition"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleDelete(workout.id)}
                        disabled={loadingDelete}
                        className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition disabled:opacity-50"
                      >
                        {loadingDelete ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
