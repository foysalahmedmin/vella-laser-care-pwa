import AuthenticationLayout from "@/components/layouts/AuthenticationLayout";
import CommonLayout from "@/components/layouts/CommonLayout";
import ParlorLayout from "@/components/layouts/ParlorLayout";
import RootLayout from "@/components/layouts/RootLayout";
import UserLayout from "@/components/layouts/UserLayout";
import AuthWrapper from "@/components/wrapper/AuthWrapper";
import SignInPage from "@/pages/(authentication)/SignInPage";
import SignUpPage from "@/pages/(authentication)/SignUpPage";
import HomePage from "@/pages/(common)/HomePage";
import ErrorPage from "@/pages/(partials)/ErrorPage";
import NotFoundPage from "@/pages/(partials)/NotFoundPage";
import ProfilePage from "@/pages/(user)/ProfilePage";
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

          { path: "services", element: <></> },
          { path: "services/all", element: <></> },
          { path: "services/book", element: <></> },
          { path: "services/:id", element: <></> },
          { path: "services-info/:id", element: <></> },

          { path: "doctors", element: <></> },
          { path: "doctors/all", element: <></> },
          { path: "doctors/book", element: <></> },
          { path: "doctors/:id", element: <></> },
          { path: "doctors-info/:id", element: <></> },

          { path: "products", element: <></> },
          { path: "products/:id", element: <></> },

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
        ],
      },
      {
        path: "user",
        element: (
          <AuthWrapper>
            <UserLayout />
          </AuthWrapper>
        ),
        children: [
          { index: true, element: <></> },
          { path: "profile", element: <ProfilePage /> },
          { path: "profile/edit", element: <></> },
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
          { index: true, element: <></> },
          { path: "profile", element: <ProfilePage /> },
          { path: "profile/edit", element: <></> },
          { path: "orders/:id", element: <></> },
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
