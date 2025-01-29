import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { appFilterReducer } from "../redux/reducer/AppfiltersReducer";

export default function DebouncedPriceInput({
  maxPrice,
}: {
  maxPrice: number;
}) {
  const dispatch = useDispatch();
  const [priceRange, setPriceRange] = useState<number>(maxPrice);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Parse the input value as an integer
    const value = parseInt(event.target.value, 10);
    // Check if the parsed value is a valid number
    if (!isNaN(value)) {
      // Update the price range state with the parsed value
      setPriceRange(value);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(appFilterReducer.actions.updateMaxPrice(priceRange));
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [priceRange, 2000]);

  return (
    <div className="flex flex-col justify-start sm:max-w-72">
      <span className="flex justify-between items-center pb-3">
        <h2 className="text-lg md:text-2xl font-bold ">Filter by Price</h2>
        <h2 className="text-sm md:text-base font-normal ">{`₹400 —  ₹${priceRange} `}</h2>
      </span>
      <input
        style={{ accentColor: "black" }}
        min={400}
        max={2500}
        id="small-range"
        type="range"
        value={priceRange}
        onChange={handleInputChange}
        className="w-full h-1 mb-6  rounded-lg appearance-none cursor-pointer range-sm bg-gray-700"
      />
    </div>
  );
}
