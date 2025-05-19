import { FileWarning } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex min-h-[calc(100vh-24rem)] flex-col items-center justify-center text-center">
      <FileWarning className="mb-4 h-24 w-24 text-gray-400" />
      <p className="text-primary-500 text-xl font-bold">No Data Found</p>
    </div>
  );
};

export default NotFound;
