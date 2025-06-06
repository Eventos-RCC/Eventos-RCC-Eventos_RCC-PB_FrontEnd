import { LandingPage } from "@/pages/LandingPage";
import { UserPage } from "@/pages/UserPage";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "@/pages/ErrorPage";

export const defaultRoutes = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
        errorElement: <ErrorPage />
    },
    {
        path: "/signup",
        element: <RegisterPage />
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/user",
        element: <UserPage children/>
    },
])