import React from "react";

const ServiceSectionSkeleton: React.FC = () => {
  return (
    <div className="bg-card mb-4 flex w-full flex-col items-center justify-center p-4 pb-6">
      {/* Top Title Skeleton */}
      <div className="mb-6 flex w-full items-center justify-between px-4">
        <div className="h-7 w-36 animate-pulse rounded bg-gray-200"></div>
        <div className="h-5 w-20 animate-pulse rounded bg-gray-200"></div>
      </div>

      {/* Service Card Skeletons */}
      <div className="flex w-full flex-wrap justify-start gap-4">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="flex h-[150px] w-[250px] animate-pulse overflow-hidden rounded-lg bg-gray-100"
          >
            {/* Image skeleton */}
            <div className="h-full w-[120px] rounded-l-lg bg-gray-300"></div>

            {/* Content skeleton */}
            <div className="flex flex-1 flex-col justify-center gap-2 py-2 pr-2 pl-4">
              <div className="h-5 w-[100px] rounded bg-gray-300"></div>
              <div className="h-5 w-[80px] rounded bg-gray-300"></div>
              <div className="mt-2 h-7 w-[120px] rounded bg-gray-300"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSectionSkeleton;
