import AuthenticationLayout from "@/components/layouts/AuthenticationLayout";
import CommonLayout from "@/components/layouts/CommonLayout";
import ParlorLayout from "@/components/layouts/ParlorLayout";
import RootLayout from "@/components/layouts/RootLayout";
import UserLayout from "@/components/layouts/UserLayout";
import AuthWrapper from "@/components/wrapper/AuthWrapper";
import SignInPage from "@/pages/(authentication)/SignInPage";
import SignUpPage from "@/pages/(authentication)/SignUpPage";
import CartPage from "@/pages/(common)/CartPage";
import DoctorsBookingPage from "@/pages/(common)/DoctorsBookingPage";
import DoctorsDetailsPage from "@/pages/(common)/DoctorsDetailsPage";
import DoctorsListPage from "@/pages/(common)/DoctorsPage";
import HomePage from "@/pages/(common)/HomePage";
import MeetPage from "@/pages/(common)/MeetPage";
import OrderDetailsPage from "@/pages/(common)/OrderDetailsPage";
import PDFPage from "@/pages/(common)/PDFPage";
import ProductsDetailsPage from "@/pages/(common)/ProductsDetailsPage";
import ProductsPage from "@/pages/(common)/ProductsPage";
import ServicesBookingPage from "@/pages/(common)/ServicesBookingPage";
import ServicesDetailsPage from "@/pages/(common)/ServicesDetailsPage";
import ServicesListPage from "@/pages/(common)/ServicesListPage";
import ServicesPage from "@/pages/(common)/ServicesPage";
import DashboardCustomer from "@/pages/(customer)/DashboardCustomer";
import FavoritePage from "@/pages/(customer)/FavoritePage";
import DashboardParlor from "@/pages/(parlor)/DashboardParlor";
import EarningsPage from "@/pages/(parlor)/EarningsPage";
import HistoryPage from "@/pages/(parlor)/HistoryPage";
import WithdrawsPage from "@/pages/(parlor)/WithdrawsPage";
import ErrorPage from "@/pages/(partials)/ErrorPage";
import NotFoundPage from "@/pages/(partials)/NotFoundPage";
import NotificationPage from "@/pages/(user)/NotificationPage";
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
          {
            path: "cart",
            element: <CartPage />,
          },

          // Services
          { path: "services", element: <ServicesPage /> },
          { path: "services/list", element: <ServicesListPage /> },
          { path: "services/:id", element: <ServicesDetailsPage /> },
          { path: "services/:id/book", element: <ServicesBookingPage /> },

          // Doctors
          { path: "doctors", element: <DoctorsListPage /> },
          { path: "doctors/list", element: <DoctorsListPage /> },
          { path: "doctors/:id", element: <DoctorsDetailsPage /> },
          { path: "doctors/:id/book", element: <DoctorsBookingPage /> },

          // Products
          { path: "products", element: <ProductsPage /> },
          { path: "products/:id", element: <ProductsDetailsPage /> },

          // Protected
          {
            path: "pdf/:id",
            element: (
              <AuthWrapper>
                <PDFPage />
              </AuthWrapper>
            ),
          },
          {
            path: "meet/:id",
            element: (
              <AuthWrapper>
                <MeetPage />
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
      // Customer
      {
        path: "customer",
        element: (
          <AuthWrapper>
            <UserLayout />
          </AuthWrapper>
        ),
        children: [
          { index: true, element: <DashboardCustomer /> },
          { path: "favorites", element: <FavoritePage /> },
          { path: "orders/:orderId", element: <OrderDetailsPage /> },
        ],
      },

      // Parlor
      {
        path: "parlor",
        element: (
          <AuthWrapper>
            <ParlorLayout />
          </AuthWrapper>
        ),
        children: [
          { index: true, element: <DashboardParlor /> },
          { path: "history", element: <HistoryPage /> },
          { path: "earnings", element: <EarningsPage /> },
          { path: "withdraws", element: <WithdrawsPage /> },
          { path: "withdraws/:withdrawId", element: <></> },
        ],
      },

      // Auth
      {
        path: "auth",
        element: <AuthenticationLayout />,
        children: [
          { path: "signin", element: <SignInPage /> },
          { path: "signup", element: <SignUpPage /> },
        ],
      },

      // Fallback
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
