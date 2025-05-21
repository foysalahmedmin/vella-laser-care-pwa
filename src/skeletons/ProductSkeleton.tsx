import React from "react";

const ProductSkeleton: React.FC = () => {
  return (
    <div className="flex animate-pulse items-center space-x-4 p-4">
      <div className="h-20 w-20 rounded-md bg-gray-200" />
      <div className="flex flex-col space-y-2">
        <div className="h-5 w-52 rounded bg-gray-200" />
        <div className="h-4 w-36 rounded bg-gray-200" />
        <div className="h-4 w-24 rounded bg-gray-200" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
