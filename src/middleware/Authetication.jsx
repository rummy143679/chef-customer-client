import { Navigate } from "react-router-dom";

function Authetication({ children }) {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default Authetication;
