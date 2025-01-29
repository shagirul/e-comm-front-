import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DonnutChart({
  labels,
  value,
  backgroundColor,
}: {
  labels: string[];
  value: number[];
  backgroundColor: string[];
}) {
  const data = {
    labels: labels,
    datasets: [
      {
        // label: "# of Votes",
        data: value,
        borderWidth: 0,
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          // "rgba(255, 206, 86, 1)",
          // "rgba(75, 192, 192, 1)",
          // "rgba(153, 102, 255, 1)",
          // "rgba(255, 159, 64, 1)",
        ],
      },
    ],
  };
  return <Doughnut data={data} />;
}
