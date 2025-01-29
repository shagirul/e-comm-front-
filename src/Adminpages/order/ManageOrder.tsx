import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteOrderMutation,
  useOrderDetailsQuery,
  useUpdateOrderMutation,
} from "../../redux/api/orderAPI";
import { Order } from "../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { UserReducerInitialState } from "../../types/reducer-types";

export default function ManageOrder() {
  const defaultData: Order = {
    shippingInfo: {
      address: "",
      city: "",
      state: "",
      country: "",
      pinCode: "",
    },
    status: "",
    subtotal: 0,
    discount: 0,
    shippingCharges: 0,
    tax: 0,
    total: 0,
    orderItems: [],
    user: { name: "", _id: "" },
    _id: "",
  };
  const params = useParams();
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const { data, isLoading, isError } = useOrderDetailsQuery(params.id!);
  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();
  const navigate = useNavigate();
  const updateHandler = async () => {
    const res = await updateOrder({
      userId: user?._id!,
      orderId: data?.order._id!,
    });

    console.log(res);
    return navigate("/admin/transaction");
    // responseToast(res, navigate, "/admin/transaction");
  };

  const deleteHandler = async () => {
    const res = await deleteOrder({
      userId: user?._id!,
      orderId: data?.order._id!,
    });
    console.log(res);
    return navigate("/admin/transaction");
    // responseToast(res, navigate, "/admin/transaction");
  };
  const {
    shippingInfo: { address, city, state, country, pinCode },
    orderItems,
    user: { name },
    status,
    tax,
    subtotal,
    total,
    discount,
    shippingCharges,
  } = data?.order || defaultData;
  if (isError) return <Navigate to={"/*"} />;
  return (
    <div className="h-full w-full  mt-[130px] sm:mt-0 sm:p-12">
      {" "}
      <div className="w-full h-full flex-col-reverse flex sm:flex-row  justify-center items-center  gap-5 ">
        <div className="h-full w-full pb-5">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    size
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderItems.map((item) => {
                  return (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <Link to={`/product/${item.productId}`}>
                          {item.name}
                        </Link>
                      </th>
                      <td className="px-6 py-4">M</td>
                      <td className="px-6 py-4">{item.quantity}</td>
                      <td className="px-6 py-4">₹ {item.price}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="h-full sm:max-w-[40%] w-full flex flex-col relative rounded-lg shadow dark:bg-gray-700 px-5 py-3  ">
          <h3 className="text-lg  font-semibold pb-3 sm:pb-10 text-gray-900 dark:text-white text-center">
            Order Info
          </h3>
          <text className="block pb-3 text-lg font-medium text-gray-900 dark:text-white underline">
            {" "}
            User Info
          </text>
          <text className="font-normal dark:text-gray-300 ">
            <span className="font-bold">Name:</span> {name}
          </text>
          <text className="font-normal dark:text-gray-300">
            <span className="font-bold">Address:</span>{" "}
            {`${address}, ${city}, ${country}, ${state}, ${pinCode}`}
          </text>
          <text className="block mb-3 text-lg font-medium text-gray-900 dark:text-white mt-5 underline">
            {" "}
            Amount Breakdown
          </text>
          <text className="font-normal dark:text-gray-300 ">
            <span className="font-bold">subtotal:</span> {subtotal}
          </text>
          <text className="font-normal dark:text-gray-300">
            <span className="font-bold">Shipping Charge:</span>{" "}
            {shippingCharges}
          </text>
          <text className="font-normal dark:text-gray-300">
            <span className="font-bold">Tax:</span> {tax}
          </text>
          <text className="font-normal dark:text-gray-300">
            <span className="font-bold">Discount:</span> {discount}
          </text>
          <text className="font-normal dark:text-gray-300">
            <span className="font-bold">Total:</span> {total}
          </text>
          <text className="block mb-3 text-lg font-medium text-gray-900 dark:text-white mt-5 underline">
            {" "}
            Status Info
          </text>
          <text className="font-normal dark:text-gray-300 ">
            <span className="font-bold">Status:</span> {status}
          </text>
          <button
            onClick={updateHandler}
            type="button"
            className="text-white mt-5   items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
          >
            Process Order
          </button>
          <button
            onClick={deleteHandler}
            type="button"
            className="text-white mt-5   items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 w-full"
          >
            Delete Order
          </button>
        </div>
      </div>
    </div>
  );
}
