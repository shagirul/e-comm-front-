import { ProductTileDataType } from ".";
import AdminProductTile from "./ProductTile";

export default function ProductTable({
  rows,
}: {
  rows: ProductTileDataType[];
}) {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Photo
          </th>
          <th scope="col" className="px-6 py-3">
            Product name
          </th>
          <th scope="col" className="px-6 py-3">
            Stock
          </th>
          <th scope="col" className="px-6 py-3">
            Category
          </th>
          <th scope="col" className="px-6 py-3">
            Price
          </th>
          <th scope="col" className="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((i, index) => {
          return (
            <AdminProductTile
              photo={i.photo}
              key={index}
              category={i.category}
              name={i.name}
              price={i.price}
              stock={i.stock}
              Link={i.action}
            />
          );
        })}
      </tbody>
    </table>
  );
}
