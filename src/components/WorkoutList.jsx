import { useState, useEffect } from "react";

export default function WorkoutList() {
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("/api/workouts");
        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }
        const data = await response.json();
        setWorkouts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (isLoading) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Your Workouts</h2>

      {workouts.length === 0 ? (
        <p className="text-gray-500">No workouts recorded yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </div>
  );
}

function WorkoutCard({ workout }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-2 capitalize">{workout.type}</h3>
      <p className="text-gray-600 mb-1">
        <span className="font-medium">Date:</span>{" "}
        {new Date(workout.date).toLocaleDateString()}
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-medium">Sets:</span> {workout.sets}
      </p>
      <p className="text-gray-600 mb-1">
        <span className="font-medium">Reps:</span> {workout.reps}
      </p>
      {workout.weight && (
        <p className="text-gray-600">
          <span className="font-medium">Weight:</span> {workout.weight} kg
        </p>
      )}
    </div>
  );
}
