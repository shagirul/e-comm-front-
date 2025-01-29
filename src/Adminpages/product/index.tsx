import { Link, NavLink } from "react-router-dom";

import { useAllProductsQuery } from "../../redux/api/productAPI";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../types/reducer-types";
import { ReactElement, useEffect, useState } from "react";
import { CustomError } from "../../types/api-types";
// import AdminProductTile from "./ProductTile";
import ProductTable from "./ProductTable";
import Skeleton from "../../component/Skeleton";

export interface ProductTileDataType {
  photo?: ReactElement;
  category: string;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}
export default function Products() {
  // const server = import.meta.env.VITE_SERVER;
  const { user, loading } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const { isLoading, isError, error, data } = useAllProductsQuery(user?._id!);

  const [rows, setRows] = useState<ProductTileDataType[]>([]);
  if (isError) {
    const err = error as CustomError;
    alert(err.data.message);
  }

  useEffect(() => {
    if (data)
      setRows(
        data.products.map((i) => ({
          photo: (
            <img className="aspect-square max-w-10 sm:max-w-16" src={i.photo} />
          ),
          category: i.category,
          name: i.name,
          price: i.price,
          stock: i.stock,
          action: <Link to={`/admin/product/${i._id}`}>Manage</Link>,
        }))
      );
  }, [data]);
  return (
    <div className="h-full w-full flex flex-col justify-between  ">
      <span className=" justify-between items-center  flex">
        <h4 className=" py-6 font-bold text-xl sm:text-3xl text-gray-700 dark:text-gray-200">
          All Products
        </h4>
        <NavLink
          to={"/admin/product/new"}
          // href="/product/new"
          className="dark:text-gray-50 text-gray-700 h-fit  font-bold sm:text-xl px-2 py-2 sm:px-4 sm:py-2 border-[1px] flex justify-center items-center rounded-lg"
        >
          + Add Products
        </NavLink>
      </span>
      <div className="grow h-full w-full ">
        <div className="relative overflow-x-auto  shadow-md sm:rounded-lg">
          {/* skeleton is not showing  */}
          {isLoading ? (
            <div className="flex-col flex gap-4">
              {new Array(5).fill("").map(() => {
                return <Skeleton className="w-full h-20" />;
              })}
            </div>
          ) : (
            <ProductTable rows={rows} />
          )}
        </div>
      </div>
      <span>pagination </span>
    </div>
  );
}
