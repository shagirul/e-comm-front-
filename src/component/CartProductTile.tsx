import crossIcon from "../assets/icons/crossicon.svg";
import { CartItem } from "../types/types";
import { server } from "../redux/store";
import {
  decrementQuantity,
  incrementQuantity,
  removeCartItem,
} from "../redux/reducer/CartReducer";
import { useDispatch } from "react-redux";

export default function CartProductTile({
  name,
  photo,
  price,
  productId,
  quantity,
  stock,
}: CartItem) {
  const dispatch = useDispatch();

  return (
    <div className="h-fit w-full flex  py-1  gap-3 justify-between">
      <div className="flex  gap-3">
        <img src={photo} className="aspect-[4/4] w-[25%] " />
        <div className="flex flex-col h-full ">
          <text className=" text-sm text-ellipsis h-[200%]">{name}</text>
          <div className="flex justify-star w-full">
            <div className="flex w-full h-full items-center justify-start">
              <button
                className="border-[0.5px] border-gray-300 px-2 min-w-10 h-full"
                onClick={() => {
                  dispatch(decrementQuantity(productId));
                }}
              >
                -
              </button>
              {/* Decrement button */}
              <h2 className=" text-center px-4 min-w-10">{quantity}</h2>
              {/* Display the current quantity */}
              <button
                className="border-[0.5px] border-gray-300 px-2 min-w-10 h-full"
                onClick={() => {
                  dispatch(incrementQuantity(productId));
                }}
              >
                +
              </button>{" "}
              {/* Increment button */}
            </div>
            <text className="w-[200%] ml-5">₹{price}</text>
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          dispatch(removeCartItem(productId));
        }}
        className="flex h-fit w-fit  p-1 border-[1px] border-gray-700"
      >
        <img src={crossIcon} className="aspect-square w-7 " />
      </button>
    </div>
  );
}
