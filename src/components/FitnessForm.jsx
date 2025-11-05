import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { addWorkout } from "../api/workoutService";
import { motion } from "framer-motion";

const workoutSchema = z.object({
  type: z.string().min(1, "Workout type is required"),
  date: z.string().min(1, "Date is required"),
  sets: z.number().min(1, "Must be at least 1 set"),
  reps: z.number().min(1, "Must be at least 1 rep"),
  weight: z.number().min(0, "Weight is required"),
});

function FitnessForm({ onWorkoutAdded = () => {} }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(workoutSchema),
    defaultValues: {
      type: "strength",
      date: new Date().toISOString().split("T")[0],
      reps: 10,
      sets: 3,
      weight: 0,
    },
  });

  const onSubmit = async (data) => {
    setSubmitError(""); // reset previous errors
    try {
      setIsSubmitting(true);
      const result = await addWorkout({
        ...data,
        weight: Number(data.weight),
      });
      onWorkoutAdded(result);
      reset();
    } catch (error) {
      console.error("Submission failed:", error);
      setSubmitError(
        error?.message || "Failed to add workout. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-6 max-w-2xl mx-auto transition-colors"
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        Log New Workout
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Workout Type" error={errors.type?.message}>
          <select {...register("type")} className="input-field">
            <option value="strength">Strength Training</option>
            <option value="cardio">Cardio</option>
            <option value="hiit">HIIT</option>
            <option value="yoga">Yoga</option>
            <option value="calisthenics">Calisthenics</option>
          </select>
        </FormField>

        <FormField label="Date" error={errors.date?.message}>
          <input type="date" {...register("date")} className="input-field" />
        </FormField>

        <FormField label="Sets" error={errors.sets?.message}>
          <input
            type="number"
            min="1"
            {...register("sets", { valueAsNumber: true })}
            className="input-field"
          />
        </FormField>

        <FormField label="Reps" error={errors.reps?.message}>
          <input
            type="number"
            min="1"
            {...register("reps", { valueAsNumber: true })}
            className="input-field"
          />
        </FormField>

        <FormField label="Weight (lb)" error={errors.weight?.message}>
          <input
            type="number"
            min="0"
            step="0.5"
            placeholder="Enter weight"
            {...register("weight", { valueAsNumber: true })}
            className="input-field"
          />
        </FormField>
      </div>

      {submitError && (
        <p className="text-red-500 text-sm font-medium">{submitError}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 
                   text-white font-medium rounded-lg transition-colors shadow-sm hover:shadow-md"
      >
        {isSubmitting ? "Saving..." : "Save Workout"}
      </button>
    </motion.form>
  );
}

function FormField({ label, error, children }) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      {children}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default FitnessForm;
