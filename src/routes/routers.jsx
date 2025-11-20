import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import Authetication from "../middleware/Authetication.jsx";
import CustomerDashboard from "../components/CustomerDashboard.jsx";
import ChefDashboard from "../components/ChefDashboard.jsx";
import AdminDashboard from "../components/AdminDashboard.jsx";
import Home from "../components/Home.jsx";
import Order from "../pages/customer-pages/Order.jsx";

// Define default routes accessible to all users
const defaultRoute = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];
const roles = {
  customer: [
    ...defaultRoute,
    {
      path: "/home",
      element: (
        <Authetication>
          {/* <CustomerDashboard /> */}
          <Home />
        </Authetication>
      ),
    },
    {
      path: "/orders",
      element: (
        <Authetication>
          {/* <CustomerDashboard /> */}
          <Order />
        </Authetication>
      ),
    },
  ],
  chef: [
    ...defaultRoute,
    {
      path: "/home",
      element: (
        <Authetication>
          {/* <ChefDashboard /> */}
          <Home />
        </Authetication>
      ),
    },
  ],
  admin: [
    ...defaultRoute,
    {
      path: "/home",
      element: (
        <Authetication>
          {/* <AdminDashboard /> */}
          <Home />
        </Authetication>
      ),
    },
  ],
  delivery: [
    ...defaultRoute,
    {
      path: "/home",
      element: (
        <Authetication>
          {/* <AdminDashboard /> */}
          <Home />
        </Authetication>
      ),
    },
  ],
  default: defaultRoute,
};

export const routers = { ...roles };
