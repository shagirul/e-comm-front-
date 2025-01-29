export default function QuantitySelector({
  stock,
  quantity,
  setQuantity,
}: {
  stock: number;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}) {
  // Function to increment the quantity

  const increment = () => {
    if (quantity >= stock) return;
    setQuantity(quantity + 1);
  };

  // Function to decrement the quantity, ensuring it doesn't go below 1
  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <div className="flex w-full h-full items-center justify-start">
      <button
        className="border-[0.5px] border-gray-300 px-2 min-w-10 h-full"
        onClick={decrement}
      >
        -
      </button>{" "}
      {/* Decrement button */}
      <h2 className=" text-center px-4 min-w-10">{quantity}</h2>
      {/* Display the current quantity */}
      <button
        className="border-[0.5px] border-gray-300 px-2 min-w-10 h-full"
        onClick={increment}
      >
        +
      </button>{" "}
      {/* Increment button */}
    </div>
  );
}
