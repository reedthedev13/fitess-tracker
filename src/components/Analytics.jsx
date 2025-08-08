import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useEffect } from "react";

Chart.register(...registerables);

export default function Analytics({ data }) {
  // Detect if dark mode is active from the HTML root
  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");

  const chartData = {
    labels: data?.labels || [],
    datasets: [
      {
        label: "Total Reps",
        data: data?.reps_data || [],
        backgroundColor: "#3b82f6", // Blue
      },
      {
        label: "Volume (Lb)",
        data: data?.volume_data || [],
        backgroundColor: "#10b981", // Green
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: isDark ? "#e5e7eb" : "#374151", // Gray-200 in dark, Gray-700 in light
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: isDark ? "#e5e7eb" : "#374151",
        },
        grid: {
          color: isDark ? "#4b5563" : "#e5e7eb",
        },
      },
      y: {
        ticks: {
          color: isDark ? "#e5e7eb" : "#374151",
        },
        grid: {
          color: isDark ? "#4b5563" : "#e5e7eb",
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow dark:shadow-gray-800 transition-colors">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Weekly Performance
      </h2>
      <div className="h-64">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
