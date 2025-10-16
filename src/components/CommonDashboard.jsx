import React from "react";
import AdminDashboard from "./AdminDashboard";
import CustomerDashboard from "./CustomerDashboard";
import ChefDashboard from "./ChefDashboard";

function CommonDashboard() {
  return (
    <div className="container-fluid min-vh-100 bg-light">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 bg-dark text-white p-4">
          <h3 className="text-center mb-4">Dashboard</h3>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <a className="nav-link text-white" href="#">
                <i className="bi bi-house me-2"></i> Home
              </a>
            </li>
            <li className="nav-item mb-2">
              <a className="nav-link text-white" href="#">
                <i className="bi bi-person me-2"></i> Profile
              </a>
            </li>
            <li className="nav-item mb-2">
              <a className="nav-link text-white" href="#">
                <i className="bi bi-box-arrow-right me-2"></i> Logout
              </a>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-9 col-lg-10 p-4">
          {/* Dynamic Content per Role */}
          {/* {user.role === "admin" && <AdminDashboard />}
          {user.role === "chef" && <ChefDashboard />}
          {user.role === "customer" && <CustomerDashboard />} */}
          {/* <AdminDashboard/> */}
          {/* <ChefDashboard/> */}
          <CustomerDashboard/>
        </div>
      </div>
    </div>
  );
}

export default CommonDashboard;
