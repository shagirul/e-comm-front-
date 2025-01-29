import { useEffect, useState } from "react";
import crossIcon from "../../assets/icons/crossicon.svg";

import CartProductTile from "../CartProductTile";
import { CartReducerInitialState } from "../../types/reducer-types";
import { useDispatch, useSelector } from "react-redux";
import {
  calculatePrice,
  discountApplied,
  removeDiscount,
} from "../../redux/reducer/CartReducer";
import axios from "axios";
import { server } from "../../redux/store";
import { useNavigate } from "react-router-dom";

export default function CartSection({
  length,
  toggleSection,
}: {
  length: number;
  toggleSection: (section: string) => void;
}) {
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState<string>("");
  const [temp, setTemp] = useState<number>(0);
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);
  const { cartItems, total, subtotal, discount, shippingCharges, tax } =
    useSelector(
      (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
    );
  const dispatch = useDispatch();
  useEffect(() => {
    const { token: cancelToken, cancel } = axios.CancelToken.source();

    const timeOutID = setTimeout(() => {
      if (couponCode) {
        axios
          .get(`${server}/api/v1/payment/discount?coupon=${couponCode}`, {
            cancelToken,
          })
          .then((res) => {
            setTemp(res.data.discount);
            // dispatch(discountApplied(res.data.discount));
            setIsValidCouponCode(true);
            dispatch(calculatePrice());
          })
          .catch(() => {
            // dispatch(discountApplied(0));
            setTemp(0);
            setIsValidCouponCode(false);
            dispatch(calculatePrice());
          });
      }
    }, 1000);

    return () => {
      clearTimeout(timeOutID);
      //cancel clear the pending(due to slow internet) request onchange
      cancel();
      setIsValidCouponCode(false);
    };
  }, [couponCode, dispatch, discount]);

  const GoToCheckOut = () => {
    if (cartItems.length > 0) {
      navigate("/checkout/address");
    }
  };

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);

  const [codesection, setCodesection] = useState<boolean>(false);
  return (
    <div className="h-full w-full flex flex-col flex-grow justify-start items-start px-[5%] pb-[1vh] pt-[3vh]">
      <div className="w-full flex justify-between border-b-[1px] border-gray-200 pb-1">
        {" "}
        <text>{length}</text>
        <button onClick={() => toggleSection("cart")}>
          <img className=" h-4  md:h-5" src={crossIcon} />
        </button>
      </div>
      <div className="flex flex-col py-3 gap-3 overflow-y-auto flex-grow">
        {cartItems.map((item) => {
          return (
            <CartProductTile
              name={item.name}
              photo={item.photo}
              price={item.price}
              productId={item.productId}
              quantity={item.quantity}
              stock={item.stock}
              key={item.productId}
            />
          );
        })}
      </div>
      <div className="border-y-[1px] border-gray-200 w-full py-5 my-5">
        <span className="w-full flex justify-between text-lg pb-5 text-gray-600">
          <text>TOTAL:</text>
          <text>₹{total}</text>
        </span>
        {cartItems.length >= 1 && (
          <div className="flex flex-col ">
            <span className="w-full flex justify-between text-xs md:text-sm pb-2 text-gray-600">
              <text>SUBTOTAL:</text>
              <text>₹{subtotal}</text>
            </span>
            <span className="w-full flex justify-between text-xs md:text-sm pb-2 text-gray-600">
              <text>SHIPPING CHARGES:</text>
              <text>₹{shippingCharges}</text>
            </span>
            <span className="w-full flex justify-between text-xs md:text-sm pb-2 text-gray-600">
              <text>ADDITIONAL TAX (GST):</text>
              <text>₹{tax}</text>
            </span>
            {discount > 0 && (
              <div className="flex flex-col">
                <span className="w-full flex justify-between text-xs md:text-sm pb-2 text-gray-600">
                  <text>COUPON APPLIED</text>
                  <text>{discount}%</text>
                </span>
                <button
                  className="underline text-sm text-start"
                  onClick={() => {
                    setCodesection(!codesection);
                    dispatch(removeDiscount());
                  }}
                >
                  Remove Applied Coupon ?
                </button>
              </div>
            )}
          </div>
        )}
        {cartItems.length >= 1 && discount <= 0 && (
          <div className="flex flex-col items-start gap-5">
            <button
              className="underline text-sm"
              onClick={() => {
                setCodesection(!codesection);
              }}
            >
              Having a Coupon Code ?
            </button>
            {codesection && (
              <div className="flex flex-col w-full">
                <div className="flex  gap-4 w-full">
                  <span className="border-[1px] border-gray-400 px-3 py-2 w-full">
                    <input
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Coupon Code"
                      type="text"
                      className=" focus:outline-none outline-none"
                    ></input>
                  </span>
                  <button
                    onClick={() => {
                      dispatch(discountApplied(temp));

                      //   console.log(temp);
                    }}
                    className={` ${
                      !isValidCouponCode
                        ? "bg-gray-600 text-gray-300"
                        : "bg-black text-white"
                    } " px-3 py-2 w-full "`}
                  >
                    APPLY
                  </button>
                </div>
                {couponCode &&
                  (isValidCouponCode ? (
                    <span className="text-green-500 text-sm">
                      ₹{temp} off using the <code>{couponCode}</code>
                    </span>
                  ) : (
                    <span className="text-red-500 text-sm">Invalid Coupon</span>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
      <button
        disabled={cartItems.length <= 0}
        onClick={GoToCheckOut}
        className={`${
          cartItems.length <= 0
            ? "bg-gray-600 text-gray-300"
            : "bg-black text-white"
        } bg-black  px-3 py-3 w-full font-bold text-lg`}
      >
        CHECKOUT
      </button>
    </div>
  );
}
