import { useSelector } from "react-redux";
import NavBar from "../../component/NavBar/NavBar";
import { UserReducerInitialState } from "../../types/reducer-types";
import { useMyOrdersQuery } from "../../redux/api/orderAPI";
import { getFullDateString } from "../../utils/features";

import { auth } from "../../firebase";
import { AuthSection } from "./AuthSection";

export default function MyAccount() {
  const { user, loading } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const { isLoading, isError, error, data } = useMyOrdersQuery(user?._id!);
  console.log(data);
  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out the user
      console.log("User logged out successfully");
      // Optionally, redirect to a different page after logout
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };
  return (
    <div className="h-full w-full flex items-start justify-start grow flex-col  bg-white  pt-16 md:pt-28">
      <NavBar></NavBar>
      <div className="w-full flex flex-col max-w-7xl mx-auto   px-5 md:px-[5%]">
        {!isLoading && (
          <div>
            <h1 className="pt-5 text-3xl font-extrabold"> My Account</h1>
            {user && (
              <span className="flex  items-center gap-3 pt-5">
                <img
                  className="aspect-square rounded-full w-14 "
                  src={user?.photo}
                />
                <span className="flex flex-col">
                  <text className="text-lg font-bold">{user?.name}</text>
                  <text className="text-base font-extralight">
                    {user?.email}
                  </text>
                </span>
              </span>
            )}
            {user ? (
              <span className="w-full flex justify-between items-center gap-5 pt-5 md:max-w-lg">
                <button className=" text-white text-sm md:text-base  font-semibold bg-black px-3 py-2 w-full">
                  Change Password
                </button>
                <button
                  onClick={handleLogout}
                  className=" text-white text-sm md:text-base  font-semibold bg-black px-3 py-2 w-full"
                >
                  Log Out
                </button>
              </span>
            ) : (
              <AuthSection />
            )}

            <span className="flex justify-between items-center w-full border-t-[0.5px] border-black mt-5 pt-2">
              {" "}
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 ">
                Orders
              </h2>
              {user && <text className="underline ">See All</text>}
            </span>

            {user ? (
              <div className="mt-6 flex   overflow-x-auto  gap-x-6 gap-y-10  xl:gap-x-8">
                {data?.orders.slice(0, 4).map((order) => {
                  return (
                    <div className="aspect-[3/2] md:aspect-[5/3] border-[0.5px] border-gray-400 min-h-44 md:min-h-56 flex flex-col px-3 py-2">
                      <span className="w-full flex justify-between border-b-[0.5px] border-gray-200 pb-2">
                        <text className="font-semibold text-sm text-gray-400">
                          {getFullDateString(order.createdAt)}
                        </text>
                        <text className="font-bold text-black text-sm">
                          {" "}
                          ₹ {order.total}
                        </text>
                      </span>
                      <div className="flex flex-col py-2 gap-2 ">
                        {order.orderItems.map((item) => {
                          return (
                            <div className="flex font-semibold md:text-xl ">
                              <text className="me-2 text-gray-500 ">
                                {item.quantity}x{" "}
                              </text>
                              <text>{item.name}</text>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="w-full pt-10 flex  justify-center items-center text-xl font-bold text-gray-400">
                Login To See Orders
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
