export default function NotAuthorized() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      {" "}
      <h1 className="mb-4 text-6xl font-semibold text-red-500">403</h1>
      <p className="mb-4 text-lg text-gray-600">
        Oops! Looks like you don't have access to Admin.
      </p>
      <div className="animate-bounce">
        <svg
          className="mx-auto h-16 w-16 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          ></path>
        </svg>
      </div>{" "}
    </div>
  );
}
