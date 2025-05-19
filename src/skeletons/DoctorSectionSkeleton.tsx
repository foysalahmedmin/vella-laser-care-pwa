import React from "react";

const DoctorSectionSkeleton: React.FC = () => {
  return (
    <div className="mb-2 flex w-full flex-col items-center bg-white p-6">
      {/* Header Skeleton */}
      <div className="mb-4 flex w-full flex-row items-center justify-between">
        <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
        <div className="h-5 w-20 animate-pulse rounded bg-gray-200" />
      </div>

      {/* Card Skeletons */}
      <div className="flex w-full flex-row gap-3 overflow-x-auto">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="h-[200px] w-[150px] animate-pulse rounded-lg bg-gray-200"
          />
        ))}
      </div>
    </div>
  );
};

export default DoctorSectionSkeleton;
