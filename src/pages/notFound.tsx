import { Link } from "react-router-dom";
const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-gray-800">404</h1>
      <p className="text-lg text-gray-600">Page Not Found</p>
      <Link
        to="/"
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Go Back
      </Link>
    </div>
  );
};

export default NotFoundPage;
