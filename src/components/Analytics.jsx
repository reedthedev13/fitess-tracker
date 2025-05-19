import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default function Analytics({ data }) {
  const chartData = {
    labels: data?.labels || [],
    datasets: [
      {
        label: "Total Reps",
        data: data?.reps_data || [],
        backgroundColor: "#3b82f6",
      },
      {
        label: "Volume (Lb)",
        data: data?.volume_data || [],
        backgroundColor: "#10b981",
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Weekly Performance</h2>
      <div className="h-64">
        <Bar
          data={chartData}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>
    </div>
  );
}
