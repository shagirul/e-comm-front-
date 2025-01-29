import { UserTileDataType } from ".";
import UserTile from "./UserTile";

export default function UserTable({ rows }: { rows: UserTileDataType[] }) {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs  uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-gray-700">
        <tr>
          <th scope="col" className="px-6 py-3">
            Email ID
          </th>
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            Gender
          </th>
          <th scope="col" className="px-6 py-3">
            Role
          </th>
          <th scope="col" className="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((tile) => {
          return (
            <UserTile
              emailId={tile._id}
              name={tile.name}
              gender={tile.gender}
              role={tile.role}
              action={tile.action}
            />
          );
        })}
      </tbody>
    </table>
  );
}
