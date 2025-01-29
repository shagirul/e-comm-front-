import { useState } from "react";
import { longArrowIcon } from "../assets/icons/longforwardarrow.svg";
import { useDispatch } from "react-redux";
import { appFilterReducer } from "../redux/reducer/AppfiltersReducer";
export default function Pagination({ totalPages }: { totalPages: number }) {
  const dispatch = useDispatch();
  // Initialize the current page with index 0 (first page)
  const [currentPage, setCurrentPage] = useState(0);

  // Define the desired number of pagination buttons to show at any time
  const pagesToShow = 4;

  // Dynamically calculate the start index for pagination.
  // This ensures the first button starts at the current page minus one,
  // but not less than the first page (0).
  let startIndex = Math.max(currentPage - 1, 0);

  // Calculate the end index for pagination to not exceed the total pages while
  // trying to display a fixed number of pages.
  const endIndex = Math.min(startIndex + pagesToShow, totalPages);

  // Calculate if the visible page buttons are less than `pagesToShow` due to reaching the end.
  // If so, adjust startIndex backwards to maintain the number of visible buttons.
  const delta = pagesToShow - (endIndex - startIndex);
  if (delta > 0 && startIndex > 0) {
    // If we are too close to the end, move startIndex backwards to keep showing `pagesToShow` buttons.
    startIndex = Math.max(startIndex - delta, 0);
  }

  const handleChangePage = (newPage: number) => {
    setCurrentPage(newPage);

    // Dispatch an action to the Redux store with the new page number
    // Assuming you have an action creator named `setPage` that accepts a page number
    dispatch(appFilterReducer.actions.updatePageNo(newPage + 1));

    // Alternatively, if you have a specific action creator function:
    // dispatch(setPage(newPage + 1));
  };

  return (
    <div
      className={`flex justify-center items-center gap-3 pb-10 w-full mx-auto overflow-x-clip `}
    >
      {/* Create an array from 1 to `totalPages` and slice it for pagination */}
      {currentPage > 0 ? (
        <button
          className="border-[0.5px] border-gray-400 h-full px-4 min-w-[60px] flex justify-center items-center"
          onClick={() => handleChangePage(currentPage - 1)}
        >
          {/* Previous button SVG icon */}
          <svg
            width="27"
            height="6"
            viewBox="0 0 27 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 6L5.01792 3.6H26.4699L26.5 2.394H5.01792L5 0L0 3L5 6Z"
              fill="gray"
            />
          </svg>
        </button>
      ) : (
        <span className="min-w-[60px]" />
      )}
      {Array.from({ length: totalPages }, (_, i) => i + 1) // Generate page numbers starting from 1
        .slice(startIndex, endIndex) // Slice the array to only include the pages we want to show
        .map((pageNumber) => {
          // Map over each page number to create a button
          return (
            <button
              key={pageNumber} // Use pageNumber as a key for React's reconciliation process
              onClick={() => handleChangePage(pageNumber - 1)} // Update currentPage state to the clicked page (adjusted for zero index)
              className={`px-2  ${
                pageNumber - 1 === currentPage &&
                "border-[0.5px] border-gray-400" // Highlight the current page button
                // Default style for other buttons
              }`}
            >
              {pageNumber}
            </button>
          );
        })}{" "}
      {currentPage < totalPages - 1 ? (
        <button
          className="border-[0.5px] border-gray-400 h-full px-4 min-w-[60px] flex justify-center items-center -rotate-180"
          onClick={() => handleChangePage(currentPage + 1)}
        >
          {/* Next button SVG icon (reusing the previous button's icon with rotation) */}
          <svg
            width="27"
            height="6"
            viewBox="0 0 27 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 6L5.01792 3.6H26.4699L26.5 2.394H5.01792L5 0L0 3L5 6Z"
              fill="gray"
            />
          </svg>
        </button>
      ) : (
        <span className="min-w-[60px]" />
      )}
    </div>
  );
}
