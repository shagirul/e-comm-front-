import { OrderTileDataType } from ".";
import OrderTile from "./OrderTile";

export default function OrderTable({ rows }: { rows: OrderTileDataType[] }) {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Unique ID
          </th>
          <th scope="col" className="px-6 py-3">
            Amount
          </th>
          <th scope="col" className="px-6 py-3">
            Discount
          </th>
          <th scope="col" className="px-6 py-3">
            Quantity
          </th>
          <th scope="col" className="px-6 py-3">
            Status
          </th>
          <th scope="col" className="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
      {rows.map((tile) => {
        return (
          <OrderTile
            _id={tile._id}
            amount={tile.amount}
            discount={tile.discount}
            quantity={tile.quantity}
            status={tile.status}
            action={tile.action}
          />
        );
      })}
    </table>
  );
}
