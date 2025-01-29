import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);
// const months = ["January", "February", "March", "April", "May", "June", "July"];
interface BarChartProps {
  months?: string[];
  horizontal?: boolean;
  data_1?: number[];
  data_2?: number[];
  title_1?: string;
  title_2?: string;
  bgColor_1?: string;
  bgColor_2?: string;
  labels?: string[];
}
export const BarChart = ({
  months = ["January", "February", "March", "April", "May", "June", "July"],
  data_1 = [1, 2, 3, 4, 5, 6, 7],
  data_2 = [7, 6, 5, 4, 3, 2, 1],
  title_1 = "Revenue",
  title_2 = "Transaction",
  bgColor_1 = "rgb(112,56,214,1)",
  bgColor_2 = "rgb(27,79,195,1)",
  horizontal = false,
  labels = months,
}: BarChartProps) => {
  const options: ChartOptions<"bar"> = {
    responsive: true,
    indexAxis: horizontal ? "y" : "x",
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },

    scales: {
      y: {
        alignToPixels: true,
      },
    },
  };

  const data: ChartData<"bar", number[], string> = {
    labels,
    datasets: [
      {
        label: title_1,
        data: data_1,
        backgroundColor: bgColor_1,
        barThickness: "flex",
        barPercentage: 1,
        categoryPercentage: 0.4,
        maxBarThickness: 500,
      },
      {
        label: title_2,
        data: data_2,
        backgroundColor: bgColor_2,
        barThickness: "flex",
        barPercentage: 1,
        categoryPercentage: 0.4,
      },
    ],
  };

  return <Bar height={horizontal ? "300" : ""} options={options} data={data} />;
};
