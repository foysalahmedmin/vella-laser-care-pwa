import AuthenticationLayout from "@/components/layouts/AuthenticationLayout";
import CommonLayout from "@/components/layouts/CommonLayout";
import ParlorLayout from "@/components/layouts/ParlorLayout";
import RootLayout from "@/components/layouts/RootLayout";
import UserLayout from "@/components/layouts/UserLayout";
import AuthWrapper from "@/components/wrapper/AuthWrapper";
import SignInPage from "@/pages/(authentication)/SignInPage";
import SignUpPage from "@/pages/(authentication)/SignUpPage";
import DoctorsDetailsPage from "@/pages/(common)/DoctorsDetailsPage";
import DoctorsHomePage from "@/pages/(common)/DoctorsHomePage";
import DoctorsPage from "@/pages/(common)/DoctorsPage";
import HomePage from "@/pages/(common)/HomePage";
import ProductsDetailsPage from "@/pages/(common)/ProductsDetailsPage";
import ProductsHomePage from "@/pages/(common)/ProductsHomePage";
import ProductsPage from "@/pages/(common)/ProductsPage";
import ServicesDetailsPage from "@/pages/(common)/ServicesDetailsPage";
import ServicesHomePage from "@/pages/(common)/ServicesHomePage";
import ServicesPage from "@/pages/(common)/ServicesPage";
import DashboardCustomer from "@/pages/(customer)/DashboardCustomer";
import { FavoritePage } from "@/pages/(customer)/FavoritePage";
import DashboardParlor from "@/pages/(parlor)/DashboardParlor";
import EarningsPage from "@/pages/(parlor)/EarningsPage";
import HistoryPage from "@/pages/(parlor)/HistoryPage";
import WithdrawsPage from "@/pages/(parlor)/WithdrawsPage";
import ErrorPage from "@/pages/(partials)/ErrorPage";
import NotFoundPage from "@/pages/(partials)/NotFoundPage";
import NotificationPage from "@/pages/(user)/NotificatonPage";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <CommonLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "cart", element: <></> },

          { path: "customer-appointments/:id", element: <></> },
          { path: "service-appointments/:id", element: <></> },
          { path: "doctor-appointments/:id", element: <></> },

          {
            path: "services",
            element: <ServicesPage />,
          },
          { path: "services-home", element: <ServicesHomePage /> },
          { path: "services/book", element: <></> },
          { path: "services/:id", element: <ServicesDetailsPage /> },
          { path: "services-info/:id", element: <></> },

          { path: "doctors", element: <DoctorsPage /> },
          { path: "doctors-home", element: <DoctorsHomePage /> },
          { path: "doctors/book", element: <></> },
          { path: "doctors/:id", element: <DoctorsDetailsPage /> },
          { path: "doctors-info/:id", element: <></> },

          { path: "products", element: <ProductsPage /> },
          { path: "products", element: <ProductsHomePage /> },
          { path: "products/:id", element: <ProductsDetailsPage /> },

          { path: "payment", element: <></> },
          { path: "payment/success", element: <></> },
          { path: "payment/failed", element: <></> },
          { path: "payment/canceled", element: <></> },

          {
            path: "pdf/:id",
            element: (
              <AuthWrapper>
                <></>
              </AuthWrapper>
            ),
          },
          {
            path: "meet/:id",
            element: (
              <AuthWrapper>
                <></>
              </AuthWrapper>
            ),
          },

          {
            path: "notifications",
            element: (
              <AuthWrapper>
                <NotificationPage />
              </AuthWrapper>
            ),
          },
        ],
      },
      {
        path: "customer",
        element: (
          <AuthWrapper>
            <UserLayout />
          </AuthWrapper>
        ),
        children: [
          {
            index: true,
            element: (
              <AuthWrapper>
                <DashboardCustomer />
              </AuthWrapper>
            ),
          },
          {
            path: "favorites",
            element: (
              <AuthWrapper>
                <FavoritePage />
              </AuthWrapper>
            ),
          },
          { path: "orders/:id", element: <></> },
        ],
      },
      {
        path: "parlor",
        element: (
          <AuthWrapper>
            <ParlorLayout />
          </AuthWrapper>
        ),
        children: [
          {
            index: true,
            element: (
              <AuthWrapper>
                <DashboardParlor />
              </AuthWrapper>
            ),
          },
          {
            path: "history",
            element: (
              <>
                <HistoryPage />
              </>
            ),
          },
          {
            path: "earnings",
            element: (
              <>
                <EarningsPage />
              </>
            ),
          },
          {
            path: "withdraws",
            element: (
              <>
                <WithdrawsPage />
              </>
            ),
          },
          { path: "withdraws/:id", element: <></> },
        ],
      },
      {
        path: "authentication",
        element: <AuthenticationLayout />,
        children: [
          { path: "sign-in", element: <SignInPage /> },
          { path: "sign-up", element: <SignUpPage /> },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
