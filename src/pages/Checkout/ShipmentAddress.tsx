import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../redux/reducer/CartReducer";
import axios from "axios";
import { server } from "../../redux/store";
import { CartReducerInitialState } from "../../types/reducer-types";
import { Navigate, useNavigate } from "react-router-dom";

export default function ShipmentAddress() {
  //

  const navigate = useNavigate();
  const { total } = useSelector(
    (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
  );
  const dispatch = useDispatch();
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });
  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(saveShippingInfo(shippingInfo));

    try {
      const { data } = await axios.post(
        `${server}/api/v1/payment/create`,
        {
          amount: total,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/checkout/payment", {
        state: data.clientSecret,
      });
    } catch (error) {
      console.log(error);
    }
  };
  if (total === 0) return <Navigate to={"/"} />;
  return (
    <form onSubmit={submitHandler} className="flex flex-col w-full  gap-4">
      <h1 className="text-2xl font-semibold pb-5">Shipping Address</h1>
      <input
        className="w-full border-[1px] border-[#1a1a1a] rounded-md px-4 py-2"
        required
        type="text"
        placeholder="Address (House no, Building, Street, Area) "
        name="address"
        value={shippingInfo.address}
        onChange={changeHandler}
      />
      <input
        className="w-full border-[1px] border-[#1a1a1a] rounded-md px-4 py-2"
        required
        type="text"
        placeholder="City"
        name="city"
        value={shippingInfo.city}
        onChange={changeHandler}
      />
      <input
        className="w-full border-[1px] border-[#1a1a1a] rounded-md px-4 py-2"
        required
        type="text"
        placeholder="State"
        name="state"
        value={shippingInfo.state}
        onChange={changeHandler}
      />
      <select
        className="w-full border-[1px] border-[#1a1a1a] rounded-md px-4 py-2"
        name="country"
        required
        value={shippingInfo.country}
        onChange={changeHandler}
      >
        <option value="">Choose Country</option>
        <option value="india">India</option>
      </select>
      <input
        className="w-full border-[1px] border-[#1a1a1a] rounded-md px-4 py-2"
        required
        type="number"
        placeholder="Pin Code"
        name="pinCode"
        value={shippingInfo.pinCode}
        onChange={changeHandler}
      />
      <button
        className="w-full text-white bg-[#1a1a1a] rounded-md px-4 py-2 mt-5 h-14"
        type="submit"
      >
        Pay Now
      </button>
    </form>
  );
}
