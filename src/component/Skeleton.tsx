export default function Skeleton({
  noDarkMode,
  ready,
  height = "h-full",
  width = "w-full",
  className = "",
  children,
}: {
  noDarkMode?: boolean;
  ready?: boolean;
  height?: string;
  width?: string;
  children?: React.ReactElement;
  className?: string;
}) {
  return (
    <>
      {ready ? (
        children // Directly use children without extra curly braces
      ) : (
        <div
          className={`flex items-center justify-center ${height} ${width} ${className}  bg-gray-300 rounded-lg animate-pulse ${
            !noDarkMode && "dark:bg-gray-700"
          }`}
        >
          {/* <span className="sr-only">Loading...</span> */}
        </div>
      )}
    </>
  );
}
