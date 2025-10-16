import React from "react";
import { FaUtensils, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar({role}) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-info px-3 shadow-sm sticky-top">
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
            <li className="nav-item">
              <Link className="nav-link nav-link-hover text-white" to="/about">
                About
              </Link>
            </li>

            {/* Role-Specific Dropdowns */}
            {role === "customer" && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white dropdown-hover"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Customer
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
                      Profile
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
                  Chef
                </a>
                <ul className="dropdown-menu dropdown-menu-end animate__animated animate__fadeInDown">
                  <li>
                    <Link className="dropdown-item" to="/my-dishes">
                      My Dishes
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/add-dish">
                      Add Dish
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
                  <button className="dropdown-item text-danger">
                    <FaSignOutAlt className="me-2" /> Logout
                  </button>
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
