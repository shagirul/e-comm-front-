import { BarChart } from "./BarChart";
import InventoryCount from "./InventoryCount";

import DonnutChart from "./DonnutChart";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useStatsQuery } from "../../redux/api/dashboardApi";
import { Navigate } from "react-router-dom";
import PercentageWidget from "./PercentageWidget";
import { getLastMonths } from "../../utils/features";

export default function Dashboard() {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { last6Months: months } = getLastMonths();
  const { isLoading, data, isError } = useStatsQuery(user?._id!);

  const stats = data?.stats!;
  console.log(stats);
  if (isError) return <Navigate to={"/"} />;
  return (
    !isLoading && (
      <div className="h-full w-full flex flex-col ">
        <h4 className=" py-6 font-bold text-xl sm:text-3xl text-gray-700 dark:text-gray-200">
          Dashboard
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <PercentageWidget
            percentage={stats.changePercent.revenue}
            number={stats.count.revenue}
            title="Revenue"
          />
          <PercentageWidget
            title="Product"
            percentage={stats.changePercent.product}
            number={stats.count.product}
          />
          <PercentageWidget
            percentage={stats.changePercent.user}
            number={stats.count.user}
            title="User"
          />
          <PercentageWidget
            percentage={stats.changePercent.order}
            number={stats.count.order}
            title="order"
          />
        </div>

        <div className="w-full flex flex-col md:flex-row h-[500px] gap-5">
          <div className="sm:hidden bg-gray-50 dark:bg-gray-800 w-full  h-full  rounded flex items-start justify-start p-5  text-gray-900 dark:text-white ">
            <BarChart horizontal={true} />
          </div>
          <div className=" sm:flex flex-col bg-gray-50 dark:bg-gray-800 w-full  h-full  rounded hidden items-center justify-center sm:p-10 ">
            <text className="text-2xl text-gray-900 dark:text-white mb-3 ">
              REVENUE & TRANSACTION
            </text>
            <BarChart
              months={months}
              // data_1={[0, 0, 0, 4, 5, 1]}
              // data_2={[6, 5, 4, 3, 56788, 90580]}
              data_1={stats.chart.revenue}
              data_2={stats.chart.order}
              title_1="Revenue"
              title_2="Transaction"
            />
          </div>
          <div className="bg-gray-50 relative dark:bg-gray-800 md:min-w-[30%]  rounded mb-5 flex flex-col justify-start items-center p-5 overflow-y-auto min-h-[400px] ">
            <div className="text-2xl text-center text-gray-900 dark:text-white py-5  bg-gray-50 dark:bg-gray-800 w-full sticky -top-5">
              Inventory Ratio
            </div>
            <InventoryCount data={stats.categoryCount} />
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row h-[500px] gap-5 mt-5">
          <div className="bg-gray-50 dark:bg-gray-800 md:min-w-[30%]  rounded mb-5 flex flex-col justify-start items-center p-12 overflow-y-auto min-h-[400px]">
            <text className="text-2xl text-gray-900 dark:text-white mb-5 ">
              Gender Ratio
            </text>
            <DonnutChart
              labels={["Female", "Male"]}
              value={[stats.userRatio.female, stats.userRatio.male]}
              backgroundColor={[
                "rgba(255, 99, 132, 0.7)",
                "rgba(54, 162, 235, 0.7)",
              ]}
            />
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 w-full rounded mb-5 flex flex-col justify-start items-center p-5 overflow-y-auto">
            <text className="text-2xl text-gray-900 dark:text-white my-5 ">
              Last Transactions
            </text>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Unique ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Discount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              {stats.latestTransaction.map((tile) => {
                return (
                  <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {tile._id}
                    </th>
                    <td className="px-6 py-4">{tile.amount}</td>
                    <td className="px-6 py-4">{tile.discount}</td>
                    <td className="px-6 py-4">{tile.quantity}</td>
                    <td className="px-6 py-4">{tile.status}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    )
  );
}
