import { useParams } from "react-router-dom";
import NavBar from "../../component/NavBar/NavBar";
import QuantitySelector from "../../component/QuantitySelector";
import { useProductDetailsQuery } from "../../redux/api/productAPI";
import ProductDetailSkeleton from "./ProductDetailPageSkelton";
import { CustomError } from "../../types/api-types";
import NotFound from "../../component/NotFound";
import { useDispatch } from "react-redux";
import { addToCart, calculatePrice } from "../../redux/reducer/CartReducer";
import { CartItem } from "../../types/types";
import { useState } from "react";

export default function ProductDetailPage() {
  const [quantity, setQuantity] = useState<number>(1);
  const { productId } = useParams<{ productId: string }>();

  const { data, isSuccess, isLoading, isError, error } = useProductDetailsQuery(
    productId!
  );
  const dispatch = useDispatch();
  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return console.log("Out of Stock");
    dispatch(addToCart(cartItem));
  };

  if (isError) {
    const err = error as CustomError;
    // alert(err.status);
    console.log(err.status, err.data.message);
  }
  // console.log(productId);
  return (
    <div className="flex  h-screen w-full grow ">
      <NavBar />
      {isError && <NotFound />}
      {isLoading && <ProductDetailSkeleton />}
      {data?.product && isSuccess && (
        <div className=" h-full flex flex-col md:flex-row md:gap-5 items-start justify-start pt-14 md:pt-28 p-[4%] max-w-6xl mx-auto">
          <div className="aspect-[3/4] md:aspect-[4/4] md:w-[150%] w-full    overflow-hidden rounded-md bg-gray-200  mb-2">
            <img
              src={`${data.product.photo}`}
              // alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
              className="h-full w-full object-cover object-center group-hover:opacity-75"
            />
          </div>
          <div className="w-full flex flex-col">
            {" "}
            <h4 className=" font-extrabold text-xs md:text-lg  text-gray-400 hover:text-gray-600 pb-5">
              {data.product.category}
            </h4>
            <h1 className="text-2xl md:text-4xl font-bold ">
              {data.product.name}
            </h1>
            <p className="mt-1 text-lg md:text-3xl font-medium text-gray-900 pb-3 md:pb-10 ">{`₹ ${data.product.price}`}</p>
            {/* <p className="md:text-lg block p-1 text-gray-400 font-extralight">
              size
            </p> */}
            <div className="flex flex-wrap gap-3 ">
              {/* {["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"].map(
                (size, i) => {
                  return (
                    <button
                      key={i}
                      className="border-[0.5px] border-gray-400 px-3 py-1 min-w-10"
                    >
                      {size}
                    </button>
                  );
                }
              )} */}
              {/* <button className=" px-3 py-1 min-w-10  bg-black text-white">
                {"size chart"}
              </button> */}
              <span className="flex w-full py-5 h-full grow">
                <QuantitySelector
                  stock={data.product.stock}
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
                <button
                  onClick={() => {
                    addToCartHandler({
                      name: data.product.name,
                      photo: data.product.photo,
                      price: data.product.price,
                      productId: data.product._id,
                      quantity: quantity,
                      stock: data.product.stock,
                    });
                    dispatch(calculatePrice());
                    setQuantity(1);
                  }}
                  className="py-2 w-[140%]  bg-black text-white"
                >
                  ADD TO CART
                </button>
              </span>
            </div>{" "}
          </div>
          {/**/}
        </div>
      )}
    </div>
  );
}
