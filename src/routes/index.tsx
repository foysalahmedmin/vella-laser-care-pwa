import AuthenticationLayout from "@/components/layouts/AuthenticationLayout";
import CommonLayout from "@/components/layouts/CommonLayout";
import RootLayout from "@/components/layouts/RootLayout";
import UserLayout from "@/components/layouts/UserLayout";
import SignInPage from "@/pages/(authentication)/SignInPage";
import SignUpPage from "@/pages/(authentication)/SignUpPage";
import ErrorPage from "@/pages/(common)/ErrorPage";
import HomePage from "@/pages/(common)/HomePage";
import NotFoundPage from "@/pages/(common)/NotFoundPage";
import ChatPage from "@/pages/(user)/ChatPage";
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
        children: [{ index: true, element: <HomePage /> }],
      },
      {
        path: "user",
        element: <UserLayout />,
        children: [
          { index: true, element: <ChatPage /> },
          { path: "profile", element: <ProfilePage /> },
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
