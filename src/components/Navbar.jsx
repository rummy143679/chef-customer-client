import React from "react";
import { FaUtensils, FaUser, FaSignOutAlt, FaGlobe } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../middleware/API";

function Navbar({ role }) {
  const navigate = useNavigate();

  // function handleLogout() {
  //   // Clear auth data
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user"); // (if stored)

  //   // Or clear EVERYTHING:
  //   // localStorage.clear();

  //   // Redirect to login page
  //   navigate("/login");
  // }

  async function handleLogout() {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      // Remove from available delivery boys
      if (user?.role === "delivery") {
        await api.post("/delivery-boy/logout", { userId: user._id });
      }

      // Clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Redirect to login
      navigate("/login");
      toast.success("Logged out successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to logout properly");
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-info px-3 shadow-sm sticky-top mb-4">
      <div className="container-fluid">
        <Link
          className="navbar-brand fw-bold text-white d-flex align-items-center"
          to="/"
        >
          <FaUtensils className="me-2 animate__animated animate__bounce" />
          Foodie Hub
        </Link>

        {/* Toggler Button */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Common Links */}
            <li className="nav-item">
              <Link className="nav-link nav-link-hover text-white" to="/">
                Home
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link nav-link-hover text-white" to="/profile">
                Profile
              </Link>
            </li> */}

            {/* Role-Specific Dropdowns */}
            {role === "customer" && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white dropdown-hover"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Services
                </a>
                <ul className="dropdown-menu dropdown-menu-end animate__animated animate__fadeInDown">
                  <li>
                    <Link className="dropdown-item" to="/menu">
                      Menu
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/orders">
                      My Orders
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Cart
                    </Link>
                  </li>
                </ul>
              </li>
            )}

            {role === "chef" && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white dropdown-hover"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Services
                </a>
                <ul className="dropdown-menu dropdown-menu-end animate__animated animate__fadeInDown">
                  <li>
                    <Link className="dropdown-item" to="/my-dishes">
                      My Dishes
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/add-dish">
                      Inventory
                    </Link>
                  </li>
                </ul>
              </li>
            )}

            {role === "delivery" && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white dropdown-hover"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Delivery
                </a>
                <ul className="dropdown-menu dropdown-menu-end animate__animated animate__fadeInDown">
                  <li>
                    <Link className="dropdown-item" to="/orders">
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </li>
                </ul>
              </li>
            )}

            {role === "admin" && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white dropdown-hover"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Admin
                </a>
                <ul className="dropdown-menu dropdown-menu-end animate__animated animate__fadeInDown">
                  <li>
                    <Link className="dropdown-item" to="/manage-users">
                      Manage Users
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/manage-chefs">
                      Manage Chefs
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/manage-dishes">
                      Manage Dishes
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </li>
                </ul>
              </li>
            )}

            {/* Profile & Logout (optional if you want extra profile menu) */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-white d-flex align-items-center dropdown-hover"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                <FaUser className="me-1" />
                Profile
              </a>
              <ul className="dropdown-menu dropdown-menu-end animate__animated animate__fadeInDown">
                <li>
                  <Link className="dropdown-item" to="/profile">
                    My Profile
                  </Link>
                </li>
                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="me-2" />
                    Logout
                  </button>
                </li>
              </ul>
            </li>

            {/* Profile & Logout (optional if you want extra profile menu) */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-white d-flex align-items-center dropdown-hover"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                {/* <FaUser className="me-1" /> */}
                <FaGlobe className="me-1" />
                Languages
              </a>
              <ul className="dropdown-menu dropdown-menu-end animate__animated animate__fadeInDown">
                <li>
                  <Link className="dropdown-item" to="/profile">
                    English
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/profile">
                    Telugu
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/profile">
                    French
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/profile">
                    Hindi
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
