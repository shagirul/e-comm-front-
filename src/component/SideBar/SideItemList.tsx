import { NavLink } from "react-router-dom";

export default function SideItemList({
  title,
  link,
  count,
  onToggle,
}: {
  title: string;
  link?: string;
  count?: number;
  onToggle: () => void;
}) {
  return (
    <li onClick={onToggle}>
      <NavLink
        end
        to={link ? link : title}
        className={({ isActive }) =>
          isActive
            ? "flex items-center p-2 text-gray-900 rounded-lg dark:text-white bg-gray-100 dark:bg-gray-700 "
            : "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 "
        }
        // href={title !== "Dashboard" ? `http://localhost:5173/${title}` : "/"}
        // className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
      >
        <span className="flex-1 ms-3 whitespace-nowrap">{title}</span>
        {count && (
          <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
            {count}
          </span>
        )}
      </NavLink>
    </li>
  );
}
