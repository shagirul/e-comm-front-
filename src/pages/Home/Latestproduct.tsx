import LatestProductTile from "../../component/LatestProductTile";
import Skeleton from "../../component/Skeleton";
import { useLatestProductsQuery } from "../../redux/api/productAPI";

export default function LatestProduct() {
  // isloading is come from rtk
  const { data, isFetching } = useLatestProductsQuery("");

  return (
    <div className="bg-white w-screen">
      <div className="mx-auto max-w-2xl px-4  sm:px-6  lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Latest Product
        </h2>
        {/* sm:grid-cols-2 lg:grid-cols-4 */}
        <div className="mt-6 flex  overflow-x-auto  gap-x-6 gap-y-10  xl:gap-x-8">
          {data?.products === undefined && isFetching
            ? ["", "", "", ""].map((i, index) => {
                return (
                  <Skeleton
                    key={index}
                    className="h-full w-full aspect-[3/4] min-w-[50vw] sm:min-w-full"
                  />
                );
              })
            : data?.products.map((i) => {
                return (
                  <LatestProductTile
                    id={i._id}
                    key={i._id}
                    name={i.name}
                    photo={i.photo}
                    price={i.price}
                    category={i.category}
                  />
                );
              })}
        </div>
      </div>
    </div>
  );
}
