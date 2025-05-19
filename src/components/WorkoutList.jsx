export default function WorkoutList({ workouts }) {
  if (!workouts) return <div>Loading workouts...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Workout History</h2>
      {workouts.length === 0 ? (
        <p className="text-gray-500">No workouts recorded yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <div key={workout.id} className="bg-white p-4 rounded-lg shadow">
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
