import React from "react";

import LatestProduct from "./Latestproduct";
import NavBar from "../../component/NavBar/NavBar";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div className="h-full w-full flex items-start justify-start grow flex-col  bg-white  pt-16 md:py-24">
      <NavBar />
      <div className="md:max-h-[50vh] aspect-video  w-full flex relative lg:mb-20 mb-12">
        <div className="w-full h-full absolute inset-0 bg-black/50"></div>
        <div className="absolute bottom-[10%] flex flex-col items-center w-full justify-center lg:gap-5 gap-2">
          <text className="capitalize font-thin text-lg lg:text-2xl text-white">
            elevate your style
          </text>
          <text className="capitalize font-bold text-2xl lg:text-5xl text-white">
            This Fall Season
          </text>
          <NavLink
            to={"/search"}
            className="px-5 py-2 border-[0.5px] border-white text-white"
          >
            Shop Bags Now
          </NavLink>
        </div>
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1637227277763-d32046b55a00?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ></img>
      </div>
      <LatestProduct />
    </div>
  );
}
