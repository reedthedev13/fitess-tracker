const API_BASE = "https://fitness-tracker-backend-1-e203.onrender.com";

export const getWorkout = async () => {
  const response = await fetch(`${API_BASE}/workouts/`);
  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }
  return await response.json();
};

export const addWorkout = async (workout) => {
  const response = await fetch(`${API_BASE}/workouts/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(workout),
  });
  if (!response.ok) {
    throw new Error("Failed to add workout");
  }
  return await response.json();
};
