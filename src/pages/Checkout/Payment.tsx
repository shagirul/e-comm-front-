import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useNewOrderMutation } from "../../redux/api/orderAPI";
import { NewOrderRequest } from "../../types/api-types";
import { resetCart } from "../../redux/reducer/CartReducer";
import {
  CartReducerInitialState,
  UserReducerInitialState,
} from "../../types/reducer-types";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const {
    shippingInfo,
    cartItems,
    subtotal,
    tax,
    discount,
    shippingCharges,
    total,
  } = useSelector(
    (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
  );

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const [newOrder] = useNewOrderMutation();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    setIsProcessing(true);

    const orderData: NewOrderRequest = {
      shippingInfo,
      orderItems: cartItems,
      subtotal,
      tax,
      discount,
      shippingCharges,
      total,
      user: user?._id!,
    };

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin },
      redirect: "if_required",
    });

    if (error) {
      setIsProcessing(false);
      return console.log(error.message || "Something Went Wrong");
    }

    if (paymentIntent.status === "succeeded") {
      console.log(orderData);
      // const res = await newOrder(orderData);
      const res = await newOrder(orderData);

      dispatch(resetCart());
      // responseToast(res, navigate, "/orders");

      navigate("/checkout/review");
    }
    setIsProcessing(false);
  };
  return (
    <div className="sm:max-w-sm mx-auto min-w-">
      <form onSubmit={submitHandler}>
        <PaymentElement />
        <button
          className="w-full text-white bg-[#1a1a1a] rounded-md px-4 py-2 mt-5 h-14"
          type="submit"
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Pay"}
        </button>
      </form>
    </div>
  );
};

export default function PaymentPage() {
  const location = useLocation();

  const clientSecret: string | undefined = location.state;

  if (!clientSecret) return <Navigate to={"/checkout/address"} />;

  return (
    <Elements
      options={{
        clientSecret,
      }}
      stripe={stripePromise}
    >
      <CheckOutForm />
    </Elements>
  );
}
