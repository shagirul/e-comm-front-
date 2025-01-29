import { useDispatch, useSelector } from "react-redux";
import { CategoriesResponse } from "../../types/api-types";
import Skeleton from "../Skeleton";
import { AppFilterInitialState } from "../../types/reducer-types";

import { appFilterReducer } from "../../redux/reducer/AppfiltersReducer";
import { NavLink, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";

export default function SearchSection({
  toggleSection,
  isSearchvisible,
  isFetching,
  data,
}: {
  toggleSection: (section: string) => void;
  isSearchvisible: boolean;
  isFetching: boolean;
  data: CategoriesResponse | undefined;
}) {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toggleSection("search");

    dispatch(appFilterReducer.actions.updateSearchQuery(search));
    navigate("/search");
    setSearch("");
  };
  // console.log(data?.categories);
  return (
    <div
      className={
        isSearchvisible
          ? "duration-600  fixed top-0 z-20 h-[100%] md:h-[60%]  w-full  bg-white text-primary shadow-lg  duration-200 ease-in-out pt-20 md:pt-32 pb-10 px-5"
          : "fixed  top-[-100%] h-[30%]    w-full   bg-white    ease-in-out "
      }
    >
      <div className="flex flex-col h-full w-full md:w-[50%] mx-auto ">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="border-b-[1px] border-gray-400 mb-5">
            <input
              style={{ accentColor: "black" }}
              type="search"
              onChange={handleSearchChange}
              value={search}
              placeholder="TYPE TO SEARCH..."
              className="focus:outline-none w-full    placeholder:text-base placeholder:font-bold  text-base font-bold pb-2  px-2"
            />
          </div>
          <button
            disabled={!search.length}
            type="submit"
            className={`px-5 py-2 mb-12  min-w-full lg:min-w-44 text-white ${
              search.length ? "bg-black" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Search
          </button>
        </form>{" "}
        <div className="flex flex-col h-full w-full">
          <h2 className="font-semibold text-sm text-gray-400 pb-2">TRENDING</h2>
          {isFetching ? (
            <div className="grid gap-3 grid-cols-3 grid-rows-3    w-full">
              {[16, 40, 28].map(() => {
                return (
                  <Skeleton
                    noDarkMode
                    ready={false}
                    height="h-7"
                    width={`w-full`}
                  />
                );
              })}
            </div>
          ) : (
            <div className="flex flex-wrap gap-4  w-full">
              {data?.categories.map((i) => {
                return (
                  <NavLink
                    onClick={() => {
                      dispatch(appFilterReducer.actions.updateCategory(i));
                      toggleSection("search");
                    }}
                    to={"/search"}
                    className="py-1 px-3   text-sm font-medium text-gray-900 focus:outline-none  rounded-sm border border-gray-200 hover:bg-gray-100  "
                  >
                    {i}
                  </NavLink>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
