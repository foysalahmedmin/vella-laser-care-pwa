import Header from "@/components/partials/Header";
import { Outlet } from "react-router";

const CommonLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default CommonLayout;
