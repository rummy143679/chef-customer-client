import React from "react";

function AdminDashboard() {
  return (
    <>
      {/* Statistic Cards */}
      <div className="container-fluid min-vh-100 bg-light">
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="card border-primary shadow-sm h-100 text-center">
              <div className="card-body">
                <i className="bi bi-people fs-2 text-primary"></i>
                <h5 className="fw-semibold mt-2">Total Users</h5>
                <p className="fs-4 fw-bold">120</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-success shadow-sm h-100 text-center">
              <div className="card-body">
                <i className="bi bi-person-badge fs-2 text-success"></i>
                <h5 className="fw-semibold mt-2">Total Chefs</h5>
                <p className="fs-4 fw-bold">15</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-warning shadow-sm h-100 text-center">
              <div className="card-body">
                <i className="bi bi-basket3 fs-2 text-warning"></i>
                <h5 className="fw-semibold mt-2">Total Dishes</h5>
                <p className="fs-4 fw-bold">75</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tables Section */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h5 className="fw-bold mb-3">User Management</h5>
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Ramesh Matteda</td>
                    <td>ramesh@example.com</td>
                    <td>
                      <span className="badge bg-info">Admin</span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-danger me-1">
                        Remove
                      </button>
                      <button className="btn btn-sm btn-outline-primary">
                        Edit
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>John Doe</td>
                    <td>john@example.com</td>
                    <td>
                      <span className="badge bg-success">Chef</span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-danger me-1">
                        Remove
                      </button>
                      <button className="btn btn-sm btn-outline-primary">
                        Edit
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Chef Management Table */}
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="fw-bold mb-3">Chef Management</h5>
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Chef Name</th>
                    <th>Specialty</th>
                    <th>Rating</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>John Doe</td>
                    <td>Italian Cuisine</td>
                    <td>4.7 ⭐</td>
                    <td>
                      <button className="btn btn-sm btn-outline-danger me-1">
                        Remove
                      </button>
                      <button className="btn btn-sm btn-outline-primary">
                        Edit
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>Jane Smith</td>
                    <td>Indian Cuisine</td>
                    <td>4.9 ⭐</td>
                    <td>
                      <button className="btn btn-sm btn-outline-danger me-1">
                        Remove
                      </button>
                      <button className="btn btn-sm btn-outline-primary">
                        Edit
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
