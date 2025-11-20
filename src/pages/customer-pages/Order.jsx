import React, { useEffect, useState } from "react";
import axios from "../../middleware/API";

export default function OrdersPage() {
  const [activeOrders, setActiveOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const customerId = user?._id || "6911eaa5497a96552d47a0d7";

        const { data } = await axios.get(`/orders/${customerId}`);
        setActiveOrders(data.currentOrders);
        setDeliveredOrders(data.oldOrders);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    getOrders();
  }, []);

  const handleTrack = (lat, lng) => {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;

  return (
    <div className="container py-4">

      {/* Active Orders */}
      <h4 className="mb-3 fw-bold text-primary">Active Orders</h4>
      {activeOrders.length === 0 && <p className="text-muted">No active orders</p>}
      <div className="row g-3">
        {activeOrders.map((order) => (
          <div className="col-md-6 col-lg-4" key={order._id}>
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title mb-0">{order.dishName}</h5>
                  <span className="badge bg-warning text-dark">{order.deliveryStatus}</span>
                </div>

                <p className="text-muted small mb-1">Order ID: {order._id}</p>
                <p className="fw-semibold mb-2">₹ {order.totalAmount}</p>

                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleTrack(order.location.lat, order.location.lng)}
                  >
                    Track Location
                  </button>

                  <button className="btn btn-outline-danger btn-sm">
                    Cancel Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr className="my-5" />

      {/* Delivered Orders */}
      <h4 className="mb-3 fw-bold text-success">Delivered Orders</h4>
      {deliveredOrders.length === 0 && <p className="text-muted">No delivered orders</p>}
      <div className="row g-3">
        {deliveredOrders.map((order) => (
          <div className="col-md-6 col-lg-4" key={order._id}>
            <div className="card shadow-sm border-0 h-100 bg-light">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title mb-0">{order.dishName}</h5>
                  <span className="badge bg-success">{order.deliveryStatus}</span>
                </div>

                <p className="text-muted small mb-1">Order ID: {order._id}</p>
                <p className="fw-semibold mb-2">₹ {order.totalPrice}</p>

                <button className="btn btn-outline-secondary btn-sm w-100">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
