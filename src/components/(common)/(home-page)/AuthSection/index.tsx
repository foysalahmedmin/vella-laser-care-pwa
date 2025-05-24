import { ChevronRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

const AuthSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-card py-4">
      <div className="container flex items-center justify-center rounded-md">
        <button
          onClick={() => navigate("/auth/signup")}
          className="flex w-full items-center justify-between rounded-md bg-blue-800 p-3 px-4"
        >
          <p className="text-md text-white">New Era of Skincare</p>
          <div className="flex items-center gap-2">
            <p className="font-bold text-white">Signup Now</p>
            <ChevronRight
              className="size-5 shrink-0 text-white"
              strokeWidth={3}
            />
          </div>
        </button>
      </div>
    </section>
  );
};

export default AuthSection;
