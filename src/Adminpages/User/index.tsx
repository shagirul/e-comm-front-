import { ReactElement, useEffect, useState } from "react";
import Skeleton from "../../component/Skeleton";
import UserTable from "./OrderTable";
import { CustomError } from "../../types/api-types";
import { UserReducerInitialState } from "../../types/reducer-types";
import { useSelector } from "react-redux";
import {
  useAllUsersQuery,
  useDeleteUserMutation,
} from "../../redux/api/userAPI";

export interface UserTileDataType {
  _id: string;
  name: string;
  gender: string;
  role: string;
  action: ReactElement;
}

export default function Orders() {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  useDeleteUserMutation;
  const [deleteUser] = useDeleteUserMutation();
  const { isLoading, isError, error, data } = useAllUsersQuery(user?._id!);
  const [rows, setRows] = useState<UserTileDataType[]>([]);
  if (isError) {
    const err = error as CustomError;
    alert(err.data.message);
  }
  const deleteHandler = async (userId: string) => {
    const res = await deleteUser({
      adminUserId: user?._id!,
      userId,
    });
    console.log(res);
  };
  useEffect(() => {
    if (data)
      setRows(
        data.users.map((i) => ({
          _id: i.email,
          name: i.name,
          gender: i.gender,
          role: i.role,
          action: (
            <button
              onClick={() => deleteHandler(i._id)}
              className="text-red-600"
            >
              Delete
            </button>
          ),
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
            <UserTable rows={rows} />
          )}
        </div>
      </div>
      <span>pagination </span>
    </div>
  );
}
