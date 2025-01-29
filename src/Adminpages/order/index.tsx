import { useSelector } from "react-redux";
import Skeleton from "../../component/Skeleton";
import { useAllOrdersQuery } from "../../redux/api/orderAPI";
import { UserReducerInitialState } from "../../types/reducer-types";
import OrderTable from "./OrderTable";
import { ReactElement, useEffect, useState } from "react";
import { CustomError } from "../../types/api-types";
import { Link } from "react-router-dom";
export interface OrderTileDataType {
  _id: string;
  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
}
export default function Orders() {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const { isLoading, isError, error, data } = useAllOrdersQuery(user?._id!);
  const [rows, setRows] = useState<OrderTileDataType[]>([]);
  if (isError) {
    const err = error as CustomError;
    alert(err.data.message);
  }
  useEffect(() => {
    if (data)
      setRows(
        data.orders.map((i) => ({
          _id: i._id,
          amount: i.total,
          discount: i.discount,
          quantity: i.orderItems.length,
          status: (
            <span
              className={`${
                i.status === "Processing"
                  ? "text-red-600"
                  : i.status === "Shipped"
                  ? "text-green-600"
                  : "text-purple-600"
              }  `}
            >
              {i.status}
            </span>
          ),
          action: <Link to={`/admin/transaction/${i._id}`}>Manage</Link>,
        }))
      );
  }, [data]);
  return (
    <div className="h-full w-full flex flex-col justify-between  ">
      <h4 className=" py-6 font-bold text-xl sm:text-3xl text-gray-700 dark:text-gray-200">
        All Orders
      </h4>
      <div className="grow h-full w-full ">
        <div className="relative overflow-x-auto  shadow-md sm:rounded-lg">
          {isLoading ? (
            <div className="flex-col flex gap-4">
              {new Array(5).fill("").map(() => {
                return <Skeleton className="w-full h-20" />;
              })}
            </div>
          ) : (
            <OrderTable rows={rows} />
          )}
        </div>
      </div>
      {/* <span>pagination </span> */}
    </div>
  );
}
