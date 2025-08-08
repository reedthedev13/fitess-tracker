const API_BASE = "http://127.0.0.1:8000";

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
