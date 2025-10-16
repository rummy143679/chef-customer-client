import React from "react";

function ChefDashboard() {
  return (
    <div className="container-fluid min-vh-100 bg-light">
      <div className="row p-3">
        {/* Header */}
        {/* <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold">Chef Dashboard</h3>
          <div className="d-flex align-items-center">
            <i className="bi bi-bell text-info fs-5 me-3"></i>
            <i className="bi bi-person-circle fs-4 text-secondary"></i>
          </div>
        </div> */}

        {/* Statistic Cards */}
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="card border-primary shadow-sm h-100 text-center">
              <div className="card-body">
                <i className="bi bi-basket3 fs-2 text-primary"></i>
                <h5 className="fw-semibold mt-2">Total Dishes</h5>
                <p className="fs-4 fw-bold">25</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-success shadow-sm h-100 text-center">
              <div className="card-body">
                <i className="bi bi-card-checklist fs-2 text-success"></i>
                <h5 className="fw-semibold mt-2">Orders Today</h5>
                <p className="fs-4 fw-bold">12</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-warning shadow-sm h-100 text-center">
              <div className="card-body">
                <i className="bi bi-star fs-2 text-warning"></i>
                <h5 className="fw-semibold mt-2">Rating</h5>
                <p className="fs-4 fw-bold">4.8 ⭐</p>
              </div>
            </div>
          </div>
        </div>

        {/* My Dishes Table */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h5 className="fw-bold mb-3">My Dishes</h5>
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Available</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Margherita Pizza</td>
                    <td>Classic Italian pizza with mozzarella</td>
                    <td>$12</td>
                    <td>
                      <span className="badge bg-success">Yes</span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-1">
                        Edit
                      </button>
                      <button className="btn btn-sm btn-outline-danger">
                        Delete
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>Paneer Butter Masala</td>
                    <td>Indian curry with paneer and butter</td>
                    <td>$10</td>
                    <td>
                      <span className="badge bg-success">Yes</span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-1">
                        Edit
                      </button>
                      <button className="btn btn-sm btn-outline-danger">
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="fw-bold mb-3">Orders</h5>
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Dishes</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#1021</td>
                    <td>John Doe</td>
                    <td>Margherita Pizza</td>
                    <td>
                      <span className="badge bg-warning">Pending</span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-success me-1">
                        Mark Done
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>#1022</td>
                    <td>Jane Smith</td>
                    <td>Paneer Butter Masala</td>
                    <td>
                      <span className="badge bg-success">Completed</span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-success me-1"
                        disabled
                      >
                        Mark Done
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChefDashboard;
