import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "../../middleware/API";
import "./Order.css";
import { Modal } from "bootstrap";
import DeliveryMap from "../../components/delivery-componenets/DeliveryMap";

export default function OrdersPage() {
  const [activeOrders, setActiveOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemsModalRef = useRef(null);
  const locationModalRef = useRef(null);
  const [modalItems, setModalItems] = useState([]);

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

  const showItemsModal = useCallback(() => {
    const itemsModal = itemsModalRef.current;
    if (!itemsModal) return;
    const modalInstance =
      Modal.getInstance(itemsModal) || new Modal(itemsModal);

    modalInstance.show();
  }, []);

  const showLocationModal = useCallback(() => {
    const locationModal = locationModalRef.current;
    if (!locationModal) return;
    const modalInstance =
      Modal.getInstance(locationModal) || new Modal(locationModal);

    modalInstance.show();
  }, []);

  if (loading) return <div className="text-center py-5">Loading...</div>;

  return (
    <div className="container py-4">

      {/* Active Orders */}
      <h4 className="mb-3 fw-bold text-primary">Active Orders</h4>
      {activeOrders.length === 0 && (
        <p className="text-muted">No active orders</p>
      )}
      <div className="orders-scroll-container mb-5">
        {activeOrders.map((order) => (
          <div className="order-card-wrapper" key={order._id}>
            <div className="card shadow border-0 rounded-4 h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title mb-0">{order._id}</h5>
                  <span className="badge bg-warning text-dark">
                    {order.orderStatus}
                  </span>
                </div>
                <div className="active-order-info p-3 rounded-4 mb-2">
                  <h6 className="text-muted mb-3 total-items">
                    🛒 Total Items : <span>{order.items.length}</span>
                  </h6>

                  <h6 className="fw-bold total-price">
                    Total: ₹ <span>{order.totalAmount}</span>
                  </h6>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <button
                    className="btn btn-outline-primary btn-sm me-2 w-100"
                    onClick={() => {
                      // setModalItems(order.items);
                      showLocationModal();
                    }}
                  >
                    Track Order
                  </button>
                  <button
                    className="btn btn-outline-success btn-sm w-100"
                    onClick={() => {
                      setModalItems(order.items);
                      showItemsModal();
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Delivered Orders */}
      <h4 className="mb-3 fw-bold text-success">Delivered Orders</h4>
      {deliveredOrders.length === 0 && (
        <p className="text-muted">No delivered orders</p>
      )}
      <div className="orders-scroll-container mb-5">
        {deliveredOrders.map((order) => (
          <div className="order-card-wrapper" key={order._id}>
            <div className="card shadow border-0 rounded-4 h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title mb-0">{order._id}</h5>
                  <span className="badge bg-success text-dark">
                    {order.orderStatus}
                  </span>
                </div>
                <div className="active-order-info p-3 rounded-4 mb-2">
                  <h6 className="text-muted mb-3 total-items">
                    🛒 Total Items : <span>{order.items.length}</span>
                  </h6>

                  <h6 className="fw-bold total-price">
                    Total: ₹ <span>{order.totalAmount}</span>
                  </h6>
                </div>
                <button
                  className="btn btn-outline-primary btn-sm w-100"
                  onClick={() => {
                    setModalItems(order.items);
                    showItemsModal();
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        className="modal fade"
        id="itemsModal"
        tabIndex="-1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-hidden="true"
        ref={itemsModalRef}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title">Total items</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div
              className="modal-body"
              style={{
                maxHeight: "400px", // Adjust height as needed
                overflowY: "auto",
              }}
            >
              {modalItems.length === 0 ? (
                <p className="text-center text-muted">Your cart is empty!</p>
              ) : (
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Image</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {modalItems.map((item) => (
                        <tr key={item._id}>
                          <td>{item.name}</td>
                          <td>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="img-fluid"
                              style={{ maxWidth: "100px" }}
                            />
                          </td>
                          <td>${item.price.toFixed(2)}</td>
                          <td>{item.quantity || 1}</td>
                          <td>
                            ${(item.price * (item.quantity || 1)).toFixed(2)}
                          </td>
                          <td>
                            <span className="badge bg-success">
                              {item.makingStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="locationModal"
        tabIndex="-1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-hidden="true"
        ref={locationModalRef}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title">Location</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div
              className="modal-body"
              style={{
                maxHeight: "400px", // Adjust height as needed
                overflowY: "auto",
              }}
            >
              <p className="text-center text-muted">
                Map integration coming soon!
              </p>
              <DeliveryMap
              // origin={routeData.origin}
              // destination={routeData.destination}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
