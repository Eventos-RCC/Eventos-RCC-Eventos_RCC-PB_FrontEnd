import { HomePage } from "@/pages/HomePage";
import { RegisterPage } from "@/pages/Register";
import { createBrowserRouter } from "react-router-dom";

export const defaultRoutes = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "/register",
        element: <RegisterPage />
    },
])