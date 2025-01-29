import { useState } from "react";
import { useDispatch } from "react-redux";
import { appFilterReducer } from "../redux/reducer/AppfiltersReducer";

export default function SortByPrice() {
  const dispatch = useDispatch();
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(appFilterReducer.actions.updateSort(e.target.value));
  };

  return (
    <select
      className="w-fit h-full focus:outline-none  md:text-lg "
      onChange={handleSortChange}
    >
      <option value="">Sort (None)</option>
      <option value="asc">Price (Low to High)</option>
      <option value="dsc">Price (High to Low)</option>
    </select>
  );
}
