export default function WorkoutList({ workouts = [], onDelete }) {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this workout?")) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/workouts/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          onDelete(id);
        } else {
          alert("Failed to delete workout");
        }
      } catch (error) {
        alert("Error deleting workout: " + error.message);
      }
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md transition-colors">
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
                         transition-colors"
            >
              <div>
                <span className="font-medium capitalize">{workout.type}</span> —{" "}
                <span>
                  {workout.sets} sets × {workout.reps} reps
                </span>
                {workout.weight !== null && workout.weight !== undefined && (
                  <span> — {workout.weight} kg</span>
                )}
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Date: {new Date(workout.date).toLocaleDateString()}
                </div>
              </div>
              <button
                onClick={() => handleDelete(workout.id)}
                className="ml-4 text-red-600 hover:text-red-800 font-semibold"
                aria-label={`Delete workout ${workout.type}`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
