import { NavLink } from "react-router-dom";

export default function LatestProductTile({
  photo,
  name,
  price,
  category,
  id,
}: {
  name: string;
  photo: string;
  price: number;
  category: string;
  id: string;
}) {
  return (
    <NavLink to={`/product/${id}`}>
      <div className="group relative w-full">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img
            src={photo}
            alt="Front of men&#039;s Basic Tee in black."
            className="h-full w-full object-cover object-center lg:h-full lg:w-full aspect-[3/4] min-w-[50vw] md:min-w-[200px]"
          ></img>
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <a href="#">
                <span aria-hidden="true" className="absolute "></span>
                {name}
              </a>
            </h3>
            <p className="mt-1 text-sm text-gray-500">{category}</p>
          </div>
          <p className="text-sm font-medium text-gray-900">{`₹${price}`}</p>
        </div>
      </div>
    </NavLink>
  );
}
