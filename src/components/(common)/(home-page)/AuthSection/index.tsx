import { ChevronRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

const AuthSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white py-2">
      <div className="mx-4 flex items-center justify-center p-2 px-4 pt-0 pb-4">
        <button
          onClick={() => navigate("/signup")}
          className="bg-secondary-500 flex w-full flex-row items-center justify-between rounded-md p-3 px-4"
        >
          <p className="text-md text-white">New Era of Skincare</p>
          <div className="flex flex-row items-center">
            <p className="font-bold text-white">Signup Now</p>
            <ChevronRight />
          </div>
        </button>
      </div>
    </div>
  );
};

export default AuthSection;
