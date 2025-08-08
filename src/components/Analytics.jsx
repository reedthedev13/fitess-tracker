import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default function Analytics({ data }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Defensive fallback for volume_data
  let volumeDataRaw = data?.volume_data || [];

  // Replace null/undefined with 0 and ensure numbers
  const volumeDataClean = volumeDataRaw.map((v) =>
    typeof v === "number" && !isNaN(v) ? v : 0
  );

  // Determine if we need to scale volume down by 1000
  const maxVolume = Math.max(...volumeDataClean, 0);
  let volumeData = volumeDataClean;
  let volumeLabel = "Volume (Lb)";

  if (maxVolume > 10000) {
    volumeData = volumeDataClean.map((v) => +(v / 1000).toFixed(2));
    volumeLabel = "Volume (Lb × 1000)";
  } else {
    // Round for display consistency
    volumeData = volumeDataClean.map((v) => +v.toFixed(2));
  }

  const chartData = {
    labels: data?.labels || [],
    datasets: [
      {
        label: "Total Reps",
        data: data?.reps_data || [],
        backgroundColor: "#3b82f6",
      },
      {
        label: volumeLabel,
        data: volumeData,
        backgroundColor: "#10b981",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: isDark ? "#e5e7eb" : "#111827",
          font: { weight: "700" },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            const value = context.parsed.y;
            return `${label}: ${value.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: isDark ? "#e5e7eb" : "#111827",
          font: { weight: "700" },
        },
        grid: {
          color: isDark ? "#4b5563" : "#e5e7eb",
        },
      },
      y: {
        ticks: {
          color: isDark ? "#e5e7eb" : "#111827",
          font: { weight: "700" },
          padding: 8,
        },
        grid: {
          color: isDark ? "#4b5563" : "#e5e7eb",
        },
      },
    },
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 transition-colors">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Weekly Performance
      </h2>
      <div className="h-64">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
