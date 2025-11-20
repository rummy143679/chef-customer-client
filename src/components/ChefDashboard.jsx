import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import api from "../middleware/API";
import { useEffect } from "react";
import { useCallback } from "react";
import { useMemo } from "react";

// Chef Dashboard Component

// orders section(table with order id, order type(online, offeline) customer name, dish name, status(pending/completed), action button to mark as completed)
// Today's Menu
// vegetarian Dishes slider(each card with dish image, dish name, brief description, price, and an "Edit" button, remove button)
// non vegetarian Dishes slider(each card with dish image, dish name, brief description, price, and an "Edit" button, remove button)
// starters slider(each card with dish image, dish name, brief description, price, and an "Edit" button, remove button)
// beverages slider(each card with dish image, dish name, brief description, price, and an "Edit" button, remove button)

function ChefDashboard() {
  const [newDish, setNewDish] = useState({
    name: "",
    description: "",
    price: "",
    available: "",
    category: "",
    subCategory: "",
    image: "",
  });
  const [dishes, setDishes] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 5,
    total: 0,
  });
  const itemsPerPageOptions = useMemo(() => [5, 10, 20], []);
  const [editingDish, setEditingDish] = useState(false);
  const subCategoryOptions = {
    Veg: ["Curry", "Rice", "Main Course", "Snack", "Bread"],
    "Non-Veg": ["Curry", "Rice", "Tandoor", "Gravy", "Main Course", "Fried"],
    Starter: ["Chinese", "Tandoor", "Fry", "Rolls", "Snack", "Fried", "Bakery"],
    Beverage: ["Cold Drink", "Hot Drink", "Juice", "Mocktail"],
    Dessert: ["Ice Cream", "Cake", "Pastry", "Sweet"],
  };

  const [deleteItem, setDeleteItem] = useState(null);

  const [orders, setOrders] = useState([]);
  const orderColumns = ["OrderID", "UserName", "status"];
  const [itemsTofinish, setItemsToFinish] = useState({ items: [] });

  const [orderPagination, setOrderPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    total: 0,
  });

  const modalRef = useRef();
  const deleteModalRef = useRef();
  const itemsModalRef = useRef();

  // orders pagination
  const OrderCurrentPageChange = (e) => {
    const newPage = parseInt(e.target.value);
    if (
      newPage >= 1 &&
      newPage <= Math.ceil(orderPagination.total / orderPagination.itemsPerPage)
    ) {
      setOrderPagination({ ...orderPagination, currentPage: newPage });
    }
  };

  const fetchOrders = useCallback(async () => {
    try {
      const res = await api.get("/orders");
      // console.log("orders",res.data);
      setOrders(res.data.orders);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const itemsToPrepare = useCallback(async (order) => {
    setItemsToFinish(order);
    console.log(order);
    const modalElement = itemsModalRef.current;
    const modalInstance = new window.bootstrap.Modal(modalElement);
    modalInstance.show();
  });

  async function updateStatus(item, status) {
    try {
      const res = await api.post(`/orders/${itemsTofinish._id}/${item._id}`, {
        status,
      });

      if (res.data) {
        // Update item status locally
        const updatedItems = itemsTofinish.items.map((i) =>
          i._id === item._id ? { ...i, makingStatus: status } : i
        );

        setItemsToFinish((prevOrder) => ({
          ...prevOrder,
          items: updatedItems,
        }));

        // Check if all items are completed
        const allCompleted = updatedItems.every(
          (i) => i.makingStatus === "completed"
        );

        if (allCompleted) {
          try {
            // Auto-assign delivery boy
            await api.post(`/delivery/assign`, {
              orderId: itemsTofinish._id,
              deliveryType: "online",
            });

            toast.success("All items completed. Delivery boy assigned.");
          } catch (deliveryError) {
            console.error("Delivery assignment failed:", deliveryError);
            toast.error("Failed to assign delivery boy.");
          }
        }

        fetchOrders(); // Refresh orders
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to update item status");
    }
  }


  // new dish adding begins
  function handleNewDish(e) {
    const { name, value } = e.target;
    setNewDish((prevDish) => ({
      ...prevDish,
      [name]: value,
    }));
  }

  async function addNewDish() {
    await api
      .post("/add-dish", newDish)
      .then((response) => {
        toast.success(`Dish "${response.data.dish.name}" added successfully`);
        handleModalClose();
        fetchDishes();
      })
      .catch((error) => {
        toast.error("Failed to add dish");
        console.error("Error adding dish:", error.message);
      });
  }

  function handleModalClose() {
    // Reset the form
    setNewDish({
      name: "",
      description: "",
      price: "",
      available: "",
      category: "",
      subCategory: "",
      image: "",
    });
    // Close the modal
    const modalElement = modalRef.current;
    const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
  }

  function editDishes(dishToEdit) {
    setEditingDish(true);
    setNewDish(dishToEdit);
    const modalElement = modalRef.current;
    const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
    modalInstance.show();
  }

  async function deleteDish() {
    const deleteModalElement = deleteModalRef.current;
    const deleteModalInstance =
      window.bootstrap.Modal.getInstance(deleteModalElement);
    if (deleteItem) {
      await api
        .delete(`/delete-dish/${deleteItem._id}`)
        .then((response) => {
          toast.success(`Dish "${deleteItem.name}" deleted successfully`);
          deleteModalInstance.hide();
          fetchDishes();
        })
        .catch((error) => {
          toast.error("Failed to delete dish");
          console.error("Error deleting dish:", error.message);
        });
    }
  }

  // new dish adding ends

  // fetch dishes from backend
  const fetchDishes = useCallback(async () => {
    try {
      await api.get("/dishes", { params: pagination }).then((response) => {
        if (response.data.status === "success") {
          toast.success("Dishes fetched successfully");
          setDishes(response.data.data.dishes);
          setPagination((prev) => ({
            ...prev,
            total: response.data.data.total,
          }));
        }
      });
    } catch (error) {
      toast.error(error.message || "Failed to fetch dishes");
      console.error("Error fetching dishes:", error);
    }
  }, [pagination.currentPage, pagination.itemsPerPage]);

  //pagination events
  const CurrentPageChange = useCallback((e) => {
    const { name, value } = e.target;
    setPagination((prev) => ({ ...prev, [name]: parseInt(value) }));
  }, []);

  useEffect(() => {
    fetchDishes();
    fetchOrders();
  }, [fetchDishes]);

  // dishes table columns
  const dishColumns = ["Name", "Description", "Price", "Available", "Actions"];
  return (
    <>
      <div className="row">
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

        {/* orders table */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold">Orders</h5>
            </div>

            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-light">
                  <tr>
                    {orderColumns.map((item, key) => (
                      <th key={key}>{item}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td
                        colSpan={orderColumns.length}
                        className="text-center fw-bold text-danger"
                      >
                        No orders available
                      </td>
                    </tr>
                  ) : (
                    orders.map((item, key) => (
                      <tr key={key} onClick={() => itemsToPrepare(item)}>
                        <td>#{item.orderId}</td>
                        <td>{item.userName}</td>
                        {/* <td>{item.dishNames.join(", ")}</td> */}
                        <td>
                          <span
                            className={`badge bg-${
                              item.status === "Completed"
                                ? "success"
                                : item.status === "Pending"
                                ? "warning"
                                : "secondary"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        {/* <td>
                          <button
                            className="btn btn-sm btn-outline-success me-1"
                            onClick={() => markOrderDone(item)}
                            disabled={item.status === "Completed"}
                          >
                            Mark Done
                          </button>
                        </td> */}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
              {/* Left: Showing X of Y */}
              <div className="mb-2 mb-md-0 flex-grow-1">
                <small className="text-muted">
                  Showing orders from{" "}
                  {orderPagination.currentPage * orderPagination.itemsPerPage -
                    orderPagination.itemsPerPage +
                    1}{" "}
                  to{" "}
                  {Math.min(
                    orderPagination.currentPage * orderPagination.itemsPerPage,
                    orderPagination.total
                  )}{" "}
                  of {orderPagination.total}
                </small>
              </div>
              {/* Center: Items per page */}
              <div className="mb-2 mb-md-0 d-flex align-items-center flex-shrink-0 me-3">
                <small className="text-muted me-2">Items per page:</small>
                <select
                  className="form-select form-select-sm"
                  style={{ width: "80px" }}
                  value={orderPagination.itemsPerPage}
                  onChange={(e) =>
                    setOrderPagination({
                      ...orderPagination,
                      currentPage: 1,
                      itemsPerPage: parseInt(e.target.value),
                    })
                  }
                >
                  {itemsPerPageOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              {/* Right: Pagination controls */}
              <div className="d-flex align-items-center gap-2 mb-2 mb-md-0 flex-shrink-0">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() =>
                    setOrderPagination((prev) => ({
                      ...prev,
                      currentPage:
                        prev.currentPage - 1 < 1 ? 1 : prev.currentPage - 1,
                    }))
                  }
                >
                  Previous
                </button>

                <div
                  className="input-group input-group-sm"
                  style={{ width: "60px" }}
                >
                  <input
                    type="number"
                    className="form-control text-center"
                    name="currentPage"
                    min={0}
                    value={orderPagination.currentPage}
                    onChange={OrderCurrentPageChange}
                  />
                </div>

                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() =>
                    setOrderPagination((prev) => ({
                      ...prev,
                      currentPage:
                        prev.currentPage + 1 >=
                        Math.ceil(prev.total / prev.itemsPerPage) + 1
                          ? prev.currentPage
                          : prev.currentPage + 1,
                    }))
                  }
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* items modal */}
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
                <h5 className="modal-title">Items to Complete</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>

              {/* 🔥 Dynamic items appear here */}
              <div className="modal-body">
                {itemsTofinish.items.length === 0 ? (
                  <p className="text-center text-muted">No items found</p>
                ) : (
                  itemsTofinish.items.map((item, index) => (
                    <div
                      key={index}
                      className="d-flex align-items-center border rounded p-2 mb-2 shadow-sm"
                    >
                      {/* Item Image */}
                      <img
                        src={item.image || "https://via.placeholder.com/60"}
                        alt={item.name}
                        className="rounded me-3"
                        width="60"
                        height="60"
                        style={{ objectFit: "cover" }}
                      />

                      {/* Item Details */}
                      <div className="flex-grow-1">
                        <h6 className="fw-bold mb-1">{item.name}</h6>
                        <small className="text-muted">
                          Qty: {item.quantity}
                        </small>
                      </div>

                      {/* Action Buttons */}
                      <div className="d-flex gap-2">
                        {item.makingStatus === "not accepted" && (
                          <>
                            <button
                              className="btn btn-sm btn-outline-warning"
                              onClick={() => updateStatus(item, "accepted")}
                            >
                              Accept
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => updateStatus(item, "rejected")}
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {item.makingStatus === "accepted" && (
                          <>
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => updateStatus(item, "cooking")}
                            >
                              Start Cooking
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => updateStatus(item, "rejected")}
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {item.makingStatus === "cooking" && (
                          <button
                            className="btn btn-sm btn-outline-success"
                            onClick={() => updateStatus(item, "completed")}
                          >
                            Complete
                          </button>
                        )}

                        {item.makingStatus === "completed" && (
                          <span className="badge bg-success">Completed</span>
                        )}

                        {item.makingStatus === "rejected" && (
                          <span className="badge bg-danger">Rejected</span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="modal-footer">
                <button className="btn btn-danger" data-bs-dismiss="modal">
                  Cancel
                </button>
                {/* <button className="btn btn-success" data-bs-dismiss="modal">
                  Completed
                </button> */}
              </div>
            </div>
          </div>
        </div>

        {/* My Dishes Table */}
        {/* dish should not be delete but it has to move to offline
        we have to show only online dishes */}
        {/* My Dishes Table */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold">My Dishes</h5>
              <button
                className="btn btn-primary btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#addDishModal"
                onClick={() => {
                  setEditingDish(false);
                }}
              >
                + Add New Dish
              </button>
            </div>

            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-light">
                  <tr>
                    {dishColumns.map((item, key) => (
                      <th key={key}>{item}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dishes.length === 0 ? (
                    <tr>
                      <td
                        colSpan={dishColumns.length}
                        className="text-center fw-bold text-danger"
                      >
                        No dishes available
                      </td>
                    </tr>
                  ) : (
                    dishes.map((item, key) => (
                      <tr key={key}>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>${item.price}</td>
                        <td>
                          <span
                            className={`badge bg-${
                              item.available ? "success" : "danger"
                            }`}
                          >
                            {item.available ? "Yes" : "No"}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-primary me-1"
                            onClick={() => editDishes(item)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            data-bs-toggle="modal"
                            data-bs-target="#deleteDishModal"
                            onClick={() => setDeleteItem(item)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
              {/* Left: Showing X of Y */}
              <div className="mb-2 mb-md-0 flex-grow-1">
                <small className="text-muted">
                  Showing dishes from{" "}
                  {pagination.currentPage * pagination.itemsPerPage -
                    pagination.itemsPerPage +
                    1}{" "}
                  to{" "}
                  {Math.min(
                    pagination.currentPage * pagination.itemsPerPage,
                    pagination.total
                  )}{" "}
                  of {pagination.total}
                </small>
              </div>

              {/* Center: Items per page */}
              <div className="mb-2 mb-md-0 d-flex align-items-center flex-shrink-0 me-3">
                <small className="text-muted me-2">Items per page:</small>
                <select
                  className="form-select form-select-sm"
                  style={{ width: "80px" }}
                  value={pagination.itemsPerPage}
                  onChange={(e) =>
                    setPagination({
                      ...pagination,
                      currentPage: 1,
                      itemsPerPage: parseInt(e.target.value),
                    })
                  }
                >
                  {itemsPerPageOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Right: Pagination controls */}
              <div className="d-flex align-items-center gap-2 mb-2 mb-md-0 flex-shrink-0">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() =>
                    setPagination((prev) => ({
                      ...prev,
                      currentPage:
                        prev.currentPage - 1 < 1 ? 1 : prev.currentPage - 1,
                    }))
                  }
                >
                  Previous
                </button>

                <div
                  className="input-group input-group-sm"
                  style={{ width: "60px" }}
                >
                  <input
                    type="number"
                    className="form-control text-center"
                    name="currentPage"
                    min={0}
                    value={pagination.currentPage} // bind this to current page state
                    onChange={CurrentPageChange}
                  />
                </div>

                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() =>
                    setPagination((prev) => ({
                      ...prev,
                      currentPage:
                        prev.currentPage + 1 >=
                        Math.ceil(prev.total / prev.itemsPerPage) + 1
                          ? prev.currentPage
                          : prev.currentPage + 1,
                    }))
                  }
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Add Dish Modal */}
        <div
          className="modal fade"
          id="addDishModal"
          tabIndex="-1"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          aria-hidden="true"
          ref={modalRef}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">
                  {editingDish ? "Edit" : "Add New"} Dish
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>

              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Dish Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter dish name"
                      name="name"
                      onChange={handleNewDish}
                      value={newDish.name}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      rows="2"
                      placeholder="Enter description"
                      name="description"
                      onChange={handleNewDish}
                      value={newDish.description}
                    ></textarea>
                  </div>

                  {/* ✅ Add This Image URL Input */}
                  <div className="mb-3">
                    <label className="form-label">Image URL</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter image URL"
                      name="image"
                      onChange={handleNewDish}
                      value={newDish.image}
                    />

                    {/* Live Preview */}
                    {newDish.image && (
                      <div className="text-center mt-2">
                        <img
                          src={newDish.image}
                          alt="Dish Preview"
                          className="img-fluid rounded"
                          style={{ maxHeight: "150px", objectFit: "cover" }}
                        />
                      </div>
                    )}
                  </div>
                  {/* ✅ End Image URL */}

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Price ($)</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter price"
                        name="price"
                        onChange={handleNewDish}
                        value={newDish.price}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Available</label>
                      <select
                        className="form-select"
                        name="available"
                        onChange={handleNewDish}
                        value={newDish.available ? "Yes" : "No"}
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select
                      className="form-select"
                      name="category"
                      onChange={handleNewDish}
                      value={newDish.category}
                    >
                      <option value="">Select Category</option>
                      {Object.keys(subCategoryOptions).map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                      {/* <option value="Veg">Veg</option>
                      <option value="Non-Veg">Non-Veg</option>
                      <option value="Beverage">Beverage</option>
                      <option value="Dessert">Dessert</option> */}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Sub Category</label>
                    <select
                      className="form-select"
                      name="subCategory"
                      onChange={handleNewDish}
                      value={newDish.subCategory}
                    >
                      <option value="">Select Sub Category</option>
                      {subCategoryOptions[newDish.category]?.map(
                        (subCategory) => (
                          <option key={subCategory} value={subCategory}>
                            {subCategory}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={handleModalClose}
                >
                  Cancel
                </button>
                {editingDish ? (
                  <button className="btn btn-success" onClick={addNewDish}>
                    Update Dish
                  </button>
                ) : (
                  <button className="btn btn-success" onClick={addNewDish}>
                    Add Dish
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* delete confirmation modal */}
        <div
          className="modal fade"
          id="deleteDishModal"
          tabIndex="-1"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          aria-hidden="true"
          ref={deleteModalRef}
        >
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">Delete Dish</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>

              <div className="modal-body">
                Are You Sure You Want to Delete this Dish?
              </div>
              <div className="modal-footer">
                <button className="btn btn-danger" onClick={deleteDish}>
                  Yes
                </button>
                <button className="btn btn-success" data-bs-dismiss="modal">
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChefDashboard;
