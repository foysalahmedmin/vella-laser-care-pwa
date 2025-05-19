import Header from "@/components/partials/Header";
import Navigation from "@/components/partials/Navigation";
import { Outlet } from "react-router";

const CommonLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Navigation />
    </>
  );
};

export default CommonLayout;
