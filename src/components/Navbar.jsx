import React from "react";
import { FaUtensils, FaUser, FaSignOutAlt, FaGlobe } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../middleware/API";
import { useEffect } from "react";
import * as bootstrap from "bootstrap";

/* ================= MENU CONFIG ================= */

const menuConfig = {
  customer: [
    {
      title: "Services",
      items: [
        { name: "Menu", path: "/" },
        { name: "My Orders", path: "/orders" },
      ],
    },
  ],
  chef: [
    {
      title: "Services",
      items: [
        { name: "My Dishes", path: "/my-dishes" },
        { name: "Inventory", path: "/add-dish" },
      ],
    },
  ],
  delivery: [
    {
      title: "Delivery",
      items: [
        { name: "Orders", path: "/orders" },
        { name: "Profile", path: "/profile" },
      ],
    },
  ],
  admin: [
    {
      title: "Admin",
      items: [
        { name: "Manage Users", path: "/manage-users" },
        { name: "Manage Chefs", path: "/manage-chefs" },
        { name: "Manage Dishes", path: "/manage-dishes" },
        { name: "Profile", path: "/profile" },
      ],
    },
  ],
};

const commonMenus = [
  {
    title: "Profile",
    icon: <FaUser className="me-1" />,
    items: [
      { name: "My Profile", path: "/profile" },
      { name: "Logout", action: "logout" },
    ],
  },
  {
    title: "Languages",
    icon: <FaGlobe className="me-1" />,
    items: [
      { name: "English", path: "#" },
      { name: "Telugu", path: "#" },
      { name: "French", path: "#" },
      { name: "Hindi", path: "#" },
    ],
  },
];

/* ================= COMPONENT ================= */

function Navbar({ role }) {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user?.role === "delivery") {
        await api.post("/delivery-boy/logout", { userId: user._id });
      }

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/login");
      toast.success("Logged out successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to logout properly");
    }
  }

  useEffect(() => {
    // Initialize all dropdowns
    const dropdownTriggerList = document.querySelectorAll(
      '[data-bs-toggle="dropdown"]',
    );
    dropdownTriggerList.forEach((dropdownTriggerEl) => {
      new bootstrap.Dropdown(dropdownTriggerEl);
    });

    // Initialize navbar collapse (burger menu)
    const collapseTriggerList = document.querySelectorAll(
      '[data-bs-toggle="collapse"]',
    );
    collapseTriggerList.forEach((collapseTriggerEl) => {
      new bootstrap.Collapse(collapseTriggerEl);
    });
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-info px-3 shadow-sm sticky-top mb-4">
      <div className="container-fluid">
        {/* LOGO */}
        <Link
          className="navbar-brand fw-bold text-white d-flex align-items-center"
          to="/"
        >
          <FaUtensils className="me-2" />
          Foodie Hub
        </Link>

        {/* TOGGLER */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAV ITEMS */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* HOME */}
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">
                Home
              </Link>
            </li>

            {/* ROLE BASED MENUS */}
            {menuConfig[role]?.map((menu, index) => (
              <li className="nav-item dropdown" key={index}>
                <button
                  type="button"
                  className="nav-link dropdown-toggle text-white btn btn-link"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {menu.title}
                </button>

                <ul className="dropdown-menu dropdown-menu-end">
                  {menu.items.map((item, i) => (
                    <li key={i}>
                      <Link className="dropdown-item" to={item.path}>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}

            {/* COMMON MENUS */}
            {commonMenus.map((menu, index) => (
              <li className="nav-item dropdown" key={index}>
                <button
                  type="button"
                  className="nav-link dropdown-toggle text-white btn btn-link d-flex align-items-center"
                  data-bs-toggle="dropdown"
                >
                  {menu.icon}
                  {menu.title}
                </button>

                <ul className="dropdown-menu dropdown-menu-end">
                  {menu.items.map((item, i) => (
                    <li key={i}>
                      {item.action === "logout" ? (
                        <button
                          className="dropdown-item text-danger"
                          onClick={handleLogout}
                        >
                          <FaSignOutAlt className="me-2" />
                          {item.name}
                        </button>
                      ) : (
                        <Link className="dropdown-item" to={item.path}>
                          {item.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
