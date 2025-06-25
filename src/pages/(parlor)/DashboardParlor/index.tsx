import useLanguage from "@/hooks/states/useLanguage";
import { Overview } from "./Overview";

const DashboardParlor = () => {
  const { language } = useLanguage();
  return (
    <div>
      <div className="flex-1">
        <div className="bg-card p-4">
          <h2 className="text-2xl font-bold">
            {language.code === "en" ? "Dashboard" : "ড্যাশবোর্ড"}
          </h2>
        </div>
        <Overview />
      </div>
    </div>
  );
};

export default DashboardParlor;
