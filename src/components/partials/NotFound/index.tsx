import { FileWarning } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex min-h-[calc(100vh-24rem)] flex-col items-center justify-center text-center">
      <FileWarning className="text-muted-foreground mb-4 h-24 w-24" />
      <p className="text-primary text-xl font-bold">No Data Found</p>
    </div>
  );
};

export default NotFound;
