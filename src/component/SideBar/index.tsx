import { signOut } from "firebase/auth";
import SideItemList from "./SideItemList";
import { auth } from "../../firebase";

const sidebaritem = [
  { title: "dashboard" },
  { title: "product", count: 5 },
  { title: "customer", count: 20 },
  { title: "transaction", count: 5 },
];
const handleSignOut = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("Sign out successful");
    })
    .catch((error) => {
      // An error happened.
      console.error("Sign out error", error);
    });
};
export default function Sidebar({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="h-full w-full relative ">
      <div
        onClick={onToggle}
        className={` absolute z-30 h-screen w-screen bg-black transition-transform sm:hidden  ${
          open ? "bg-opacity-40" : "hidden"
        }`}
      ></div>
      <div
        id="separator-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform  sm:translate-x-0 
    ${open ? "translate-x-0" : "-translate-x-full"}
    `}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {sidebaritem.map((i) => {
              return (
                <SideItemList
                  onToggle={onToggle}
                  title={i.title}
                  count={i.count}
                  link={i.title === "dashboard" ? "/admin" : undefined}
                />
              );
            })}
            <li
              onClick={() => {
                onToggle();
                handleSignOut();
              }}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 "
            >
              <span className="flex-1 ms-3 whitespace-nowrap">
                {"Sign Out"}
              </span>
            </li>
          </ul>
          <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
            <SideItemList onToggle={onToggle} title="Coupon" />
            <SideItemList
              onToggle={onToggle}
              link="product/new"
              title="Add New Product"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}
