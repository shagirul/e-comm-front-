import { Product } from "../../types/types";
import { ReactElement } from "react";

export default function AdminProductTile({
  photo,
  name,
  category,
  price,
  stock,
  Link,
}: {
  name: string;
  price: number;
  stock: number;
  category: string;
  Link: ReactElement;
  photo?: ReactElement;
}) {
  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td className="px-6 py-4">{photo}</td>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {name}
      </th>
      <td className="px-6 py-4">{stock}</td>
      <td className="px-6 py-4">{category}</td>
      <td className="px-6 py-4">{price}</td>
      <td className="px-6 py-4">{Link}</td>
    </tr>
  );
}
