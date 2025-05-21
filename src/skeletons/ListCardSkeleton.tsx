import React from "react";

const ListCardSkeleton: React.FC = () => {
  return (
    <div className="flex w-full animate-pulse items-center justify-between border-b border-gray-100 p-4">
      {/* Left Side: Avatar + Text */}
      <div className="flex w-[70%] items-center space-x-3">
        <div className="h-10 w-10 rounded-full bg-gray-200" />
        <div className="space-y-1">
          <div className="h-5 w-28 rounded bg-gray-200" />
          <div className="mt-1 h-3 w-20 rounded bg-gray-200" />
        </div>
      </div>

      {/* Right Side: Button or Value Placeholder */}
      <div className="h-5 w-16 rounded bg-gray-200" />
    </div>
  );
};

export default ListCardSkeleton;
