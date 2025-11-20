import "./App.css";
import { Route, Routes } from "react-router-dom";
import { routers } from "./routes/routers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

//evry user has unique email
// but if a admin has to login as cutomer and chef this has to handle

function App() {
  // Get user role from localStorage
  const user = useSelector((state) => state.auth.user);
  const role = user?.role ?? null;

  //filter routes based on role
  const filteredRoutes = role ? routers[role] : routers["default"];

  return (
    <>
      <ToastContainer />
      <Routes>
        {filteredRoutes.map((route, index) => (
          <Route path={route.path} element={route.element} key={index} />
        ))}
        <Route
          path="/"
          element={<Navigate to={role ? "/home" : "/login"} replace />}
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
