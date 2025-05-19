import { useState } from "react";
import { format } from "date-fns";

function FitnessForm({ onAdd }) {
  const [workout, setWorkout] = useState({
    type: "strength",
    date: format(new Date(), "yyyy-MM-dd"),
    reps: 10,
    sets: 3,
    weight: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(workout);
    setWorkout({
      type: "strength",
      date: format(new Date(), "yyyy-MM-dd"),
      reps: 10,
      sets: 3,
      weight: null,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow"
    >
      <h2 className="text-xl font-semibold">Add Workout</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2"></div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Workout
      </button>
    </form>
  );
}

export default FitnessForm;
