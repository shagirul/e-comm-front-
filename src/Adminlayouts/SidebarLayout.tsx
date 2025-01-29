import { useState } from "react";

import { Outlet } from "react-router-dom";
import Sidebar from "../component/SideBar";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../types/reducer-types";

export default function SidebarLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div className="w-full h-full bg-white dark:bg-[#111827]">
      {user && <Sidebar open={sidebarOpen} onToggle={handleSidebarToggle} />}
      <button
        onClick={handleSidebarToggle}
        data-drawer-target="separator-sidebar"
        data-drawer-toggle="separator-sidebar"
        aria-controls="separator-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <div className=" h-screen sm:p-4 sm:ml-64 bg-white dark:bg-[#111827]">
        <div className=" grow h-full p-4 sm:border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
