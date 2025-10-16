import { Navigate, Route } from "react-router-dom";
import Register from "../components/Register";
import Login from "../components/Login";
import Home from "../components/Home"

export const routers = [
  {
    path: "/", // redirect root → /register
    element: <Navigate to="/register" replace />,
  },
  {
    path: "/register", // ✅ Root path
    element: <Register />,
  },
  {
    path: "/login", // ✅ Root path
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
];
