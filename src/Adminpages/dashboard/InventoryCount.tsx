export default function InventoryCount({
  data,
}: {
  data: Record<string, number>[];
}) {
  return (
    <>
      {data.map((i) => {
        const [heading, value] = Object.entries(i)[0];
        return (
          <div className=" w-full my-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-base font-medium text-blue-700 dark:text-white">
                {heading}
              </span>
              <span className="text-sm font-medium text-blue-700 dark:text-white">
                {`${value} %`}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-blue-400 h-2.5 rounded-full"
                style={{ width: "30%" }}
              ></div>
            </div>
          </div>
        );
      })}
    </>
  );
}
