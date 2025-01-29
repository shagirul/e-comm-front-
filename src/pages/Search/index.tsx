import NavBar from "../../component/NavBar/NavBar";
import FiltersLayoyts from "../../layouts/Filterslayouts";

export default function Search() {
  return (
    <div className="flex  h-screen w-full grow ">
      <NavBar />
      <FiltersLayoyts />
    </div>
  );
}
