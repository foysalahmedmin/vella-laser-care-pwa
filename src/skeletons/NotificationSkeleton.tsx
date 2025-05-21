import React from "react";

const NotificationSkeleton: React.FC = () => {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center border-b border-gray-200 p-4">
        <h2 className="ml-2 text-xl font-bold">Notifications</h2>
      </div>

      {/* Skeleton List */}
      <div className="animate-pulse divide-y divide-gray-200 px-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-4 py-4">
            <div className="h-10 w-10 rounded-full bg-gray-200" />
            <div className="flex flex-col space-y-2">
              <div className="h-5 w-64 rounded bg-gray-200" />
              <div className="h-4 w-36 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationSkeleton;
