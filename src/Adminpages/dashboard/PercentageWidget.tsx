export default function PercentageWidget({
  percentage = 25,
  title = "Revenue",
  number = 1234,
  chartColor,
}: {
  percentage?: number;
  title?: string;
  number?: number;
  chartColor?: string | undefined;
}) {
  return (
    <div className="flex items-center justify-center h-36 md:h-42 rounded bg-gray-50 dark:bg-gray-800 ">
      <div className="flex flex-col w-full p-5">
        {" "}
        <text className="font-normal text-gray-700 dark:text-gray-400">
          {title}
        </text>
        <text className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ">
          {`${number}`}
        </text>
        <text
          className={`${
            percentage > 0 ? "text-green-500" : "text-red-500"
          }  mb-2 text-xl font-bold tracking-tight `}
        >
          {`${percentage}%`}
        </text>
      </div>
      <div className="w-full hidden md:block"></div>
    </div>
  );
}
