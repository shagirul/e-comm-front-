import { ReactElement } from "react";

export default function OrderTile({
  _id,
  amount,
  discount,
  quantity,
  status,
  action,
}: {
  _id: string;
  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
}) {
  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {_id}
      </th>
      <td className="px-6 py-4">{amount}</td>
      <td className="px-6 py-4">{discount}</td>
      <td className="px-6 py-4">{quantity}</td>
      <td className="px-6 py-4">{status}</td>
      <td className="px-6 py-4">{action}</td>
    </tr>
  );
}
