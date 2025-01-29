import { Outlet } from "react-router-dom";

export default function ProductLayout() {
  return (
    <main className="h-full w-full bg ">
      <Outlet></Outlet>
    </main>
  );
}
