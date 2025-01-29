import { useState } from "react";
import BreadCrumb from "../component/BreadCrumb";
import SearchProductTile from "../component/SearchProductTile";
import { useDispatch, useSelector } from "react-redux";
import DebouncedPriceInput from "../component/debouncedPriceInput";
import SortByPrice from "../component/SortbyPrice";
import { useSearchProductsQuery } from "../redux/api/productAPI";
import { AppFilterInitialState } from "../types/reducer-types";
import Pagination from "../component/Pagination";
import Skeleton from "../component/Skeleton";
import { CustomError } from "../types/api-types";
import { appFilterReducer } from "../redux/reducer/AppfiltersReducer";

export default function FiltersLayout() {
  const { search, page, category, sort, maxPrice } = useSelector(
    (state: { appFilterReducer: AppFilterInitialState }) =>
      state.appFilterReducer
  );
  const dispatch = useDispatch();

  // Trigger searchProducts query whenever the filter state changes
  const { data, error, isLoading, isError } = useSearchProductsQuery({
    search,
    page,
    category,
    sort,
    price: maxPrice,
  });
  if (isError) {
    const err = error as CustomError;
    alert(err.status + err.data.message);
  }

  return (
    <div className="h-full w-full flex flex-col pt-20 sm:pt-32  px-5 md:px-[5%] md:max-w-7xl mx-auto">
      <DebouncedPriceInput maxPrice={maxPrice} />
      <span className="flex justify-between">
        <BreadCrumb />
        <span className=" w-fit border-b-2 pb-1 border-gray-300">
          <SortByPrice />
        </span>
      </span>
      {(category || search) && (
        <div className="text-2xl md:text-5xl text-gray-600 font-extrabold pt-5 flex flex-col">
          {search && (
            <div className="text-sm md:text-lg font-normal flex gap-5 items-center justify-start">
              <text>Showing Result for </text>
              <button
                onClick={() => {
                  dispatch(appFilterReducer.actions.updateSearchQuery(""));
                }}
                className="py-1 px-4 mr-4 text-xs rounded-full font-medium text-gray-900 focus:outline-none bg-white border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 flex items-center gap-2"
              >
                <span>Clear Search</span>
                <svg
                  className="w-3 h-3 text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 8.586l-4.95-4.95a1 1 0 10-1.414 1.414L8.586 10l-4.95 4.95a1 1 0 101.414 1.414L10 11.414l4.95 4.95a1 1 0 001.414-1.414L11.414 10l4.95-4.95a1 1 0 10-1.414-1.414L10 8.586z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {/* <br /> */}
            </div>
          )}
          <text>{search + category}</text>
        </div>
      )}

      <div className="bg-white">
        <div className="mx-auto max-w-2xl   py-8 sm:py-16 md:max-w-7xl ">
          <h2 className="sr-only">Products</h2>
          {error && (
            <div className="h-full w-full flex justify-center items-center text-center">
              Something Went Wrong
            </div>
          )}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4   xl:gap-x-8">
            {isLoading &&
              ["", "", "", ""].map((_, i) => {
                return (
                  <Skeleton
                    key={i}
                    noDarkMode
                    className="aspect-[3/4] h-full w-full overflow-hidden rounded-lg bg-gray-200 "
                  />
                );
              })}
            {data?.products &&
              data?.products.length > 0 &&
              data.products.map((product) => {
                return (
                  <SearchProductTile
                    stock={product.stock}
                    id={product._id}
                    key={product._id}
                    photo={product.photo}
                    name={product.name}
                    price={product.price}
                  />
                );
              })}
          </div>
          {data?.products && data?.products.length === 0 && (
            <div className="md:text-2xl h-full w-full flex justify-center items-center text-center">
              No Result Found !!!
            </div>
          )}
        </div>
      </div>

      {typeof data?.totalPage === "number" && data.totalPage > 1 && (
        <Pagination totalPages={data.totalPage} />
      )}
    </div>
  );
}
