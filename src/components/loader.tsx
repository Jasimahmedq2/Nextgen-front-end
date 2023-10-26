import React from "react";

const Loader = ({ loading }: { loading: boolean }) => {
  return (
    <div className={`w-full h-full ${loading ? "animate-pulse" : ""}`}>
      <div className="w-2/3 h-12 mx-auto my-8 bg-gray-200 rounded-md"></div>
      <div className="w-5/6 h-4 mx-auto my-4 bg-gray-200 rounded-md"></div>
      <div className="w-4/5 h-4 mx-auto my-4 bg-gray-200 rounded-md"></div>
    </div>
  );
};

export default Loader;
