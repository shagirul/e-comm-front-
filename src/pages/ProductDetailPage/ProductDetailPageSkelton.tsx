import Skeleton from "../../component/Skeleton";

export default function ProductDetailSkeleton() {
  return (
    <div className="flex grow flex-col items-start justify-center pt-16 p-[4%] h-full">
      <Skeleton
        className=" aspect-[3/4] w-full  overflow-hidden rounded-md bg-gray-200  mb-2"
        noDarkMode
        ready={false}
      ></Skeleton>
      <Skeleton
        className=" aspect-[20/3] w-[30%]  overflow-hidden rounded-md bg-gray-200   mb-3"
        noDarkMode
        ready={false}
      ></Skeleton>
      <Skeleton
        className=" aspect-[20/3] w-[60%]  overflow-hidden rounded-md bg-gray-200   mb-3"
        noDarkMode
        ready={false}
      ></Skeleton>
      <Skeleton
        className=" aspect-[20/5] w-full  overflow-hidden rounded-md bg-gray-200   mb-7"
        noDarkMode
        ready={false}
      ></Skeleton>
      <Skeleton
        className=" aspect-[20/3] w-full  overflow-hidden rounded-md bg-gray-200   mb-3"
        noDarkMode
        ready={false}
      ></Skeleton>
    </div>
  );
}
