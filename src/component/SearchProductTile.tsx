import { NavLink } from "react-router-dom";

export default function SearchProductTile({
  id,
  name,
  price,
  photo,
  stock,
}: {
  id: string;
  name: string;
  price: number;
  photo: string;
  stock: number;
}) {
  return (
    <div className="relative">
      <div
        className={`${
          stock < 1 ? "flex" : "hidden"
        } min-h-full min-w-full bg-white bg-opacity-50 absolute z-10  justify-center items-center`}
      >
        <text className="bg-black bg-opacity-90 text-xs  text-white px-2 py-1 border-[1px] border-gray-600 ">
          OUT OF STOCK
        </text>
      </div>
      <NavLink to={`/product/${id}`} className="group">
        <div className="aspect-[3/4] w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          <img
            src={photo}
            // alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          ></img>
        </div>
        <h3 className="mt-4 text-sm text-gray-700">{name}</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">{`₹ ${price}`}</p>
      </NavLink>
    </div>
  );
}
// ${stock < 5 && "bg-white bg-opacity-45"}
