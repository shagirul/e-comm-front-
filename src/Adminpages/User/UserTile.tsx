export default function UserTile({
  emailId,
  name,
  gender,
  role,
  action,
}: {
  emailId: string;
  name: string;
  gender: string;
  role: string;
  action: React.ReactElement;
}) {
  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {emailId}
      </th>
      <td className="px-6 py-4">{name}</td>
      <td className="px-6 py-4">{gender}</td>
      <td className="px-6 py-4">{role}</td>
      <td className="px-6 py-4">
        {/* <a
          href="#"
          className="font-medium text-red-600 dark:text-red-500 hover:underline"
        >
          Delete
        </a> */}
        {action}
      </td>
    </tr>
    // <div className="flex w-full items-center justify-between h-24 rounded bg-gray-100 dark:bg-gray-800 text-2xl text-gray-400 dark:text-gray-500">
    //   <span className="min-w-20 sm:min-w-20 min-h-16 h-[80%] mx-3 my-2 bg-white rounded-md sm:rounded-lg"></span>
    //   <p className=" text-start w-full text-sm sm:text-lg text-gray-700 font-medium dark:text-gray-300">
    //     Education Dashboard
    //   </p>
    //   <text className="sm:w-[20%] hidden sm:block text-base sm:textlg">
    //     10000
    //   </text>
    //   <text className="sm:w-[20%] hidden sm:block  text-base sm:textlg">
    //     50
    //   </text>
    //   <button className="px-2 py-1 text-white font-medium text-sm sm:text-lg bg-[#2463EB] mx-4 rounded-md">
    //     Update
    //   </button>
    // </div>
  );
}
