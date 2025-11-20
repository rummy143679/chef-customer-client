import React, { useCallback, useEffect, useRef, useState } from "react";
import api from "../middleware/API";
import { toast } from "react-toastify";
import OrderButton from "./customer-componenets/OrderButton";
import { useNavigate } from "react-router-dom";

function CustomerDashboard() {
  const [topItemsFromEachCategory, setTopItemsFromEachCategory] = useState([]);
  const [topRated, setTopRated] = useState(null);
  const [categoryWiseItems, setCategoryWiseItems] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const ordersModalRef = useRef();
  const navigate = useNavigate();
  // const [cartCount, setcartCount] = useState([]);

  const fetchTopItemsFromEachCategory = useCallback(() => {
    // top-items-of-each-category === tioec
    api
      .get("/tioec")
      .then((response) => {
        setTopItemsFromEachCategory(response.data.data);
      })
      .catch((error) => {
        toast.error("Failed to fetch top items from each category");
        console.error("Error fetching top items from each category:", error);
      });
  }, []);

  const fetchCategoryWise = useCallback(async () => {
    await api
      .get("/category-wise")
      .then((response) => {
        setCategoryWiseItems(response.data.data);
      })
      .catch((e) => {
        toast.error(e.message);
        console.log(e.message);
      });
  }, []);

  const toprated = useCallback(() => {
    api.get("/top-rated").then((response) => {
      setTopRated(response.data.data);
    });
  }, []);

  const handleCart = useCallback((dish) => {
    console.log(dish);
    setCartItems((prev) => {
      const exists = prev.find((item) => item._id === dish._id);
      if (exists) {
        return prev.filter((item) => item._id !== dish._id);
      } else {
        return [...prev, { ...dish, quantity: 1 }]; // Initialize quantity = 1
      }
    });
  }, []);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        await Promise.all([
          fetchTopItemsFromEachCategory(),
          toprated(),
          fetchCategoryWise(),
        ]);
      } catch (error) {
        toast.error(error.message);
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, [fetchTopItemsFromEachCategory, toprated, fetchCategoryWise]);

  const handleOrders = useCallback(() => {
    const ordersModal = ordersModalRef.current;
    const modalInstance =
      window.bootstrap.Modal.getOrCreateInstance(ordersModal);
    modalInstance.show();
  }, []);

  const updateDishQuantity = useCallback((dishId, action) => {
    setCartItems(
      (prev) =>
        prev
          .map((item) => {
            if (item._id === dishId) {
              if (action === "add")
                return { ...item, quantity: item.quantity + 1 };
              if (action === "remove")
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          })
          .filter((item) => item.quantity > 0) // remove if quantity becomes 0
    );
    console.log(cartItems);
  }, []);

  const handlePayNow = async () => {
    console.log("payment");
    if (cartItems.length === 0) {
      toast.warning("Your cart is empty!");
      return;
    }

    try {
      const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.price * (item.quantity || 1),
        0
      );

      let customerLocation = { lat: 0, lng: 0 }; // fallback
      if (navigator.geolocation) {
        await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              customerLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              resolve();
            },
            (err) => {
              console.error("Location error:", err);
              resolve(); // allow payment even if location fails
            },
            { enableHighAccuracy: true }
          );
        });
      }

      // 1️⃣ Create Razorpay order
      const { data } = await api.post("/payment/create", {
        amount: totalAmount,
      });

      if (!data.success || !data.order) {
        toast.error("Failed to create payment order.");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount, // Already in paise from backend
        currency: "INR",
        order_id: data.order.id,
        name: "Chef Customer",
        description: "Food Order Payment",
        prefill: {
          name: JSON.parse(localStorage.getItem("user"))?.name,
          email: JSON.parse(localStorage.getItem("user"))?.email,
        },
        theme: { color: "#3399cc" },

        handler: async function (response) {
          try {
            const itemsCopy = cartItems.map((i) => ({
              ...i,
              makingStatus: "not accepted",
            }));

            const result = await api.post("/payment/verify", {
              ...response,
              items: itemsCopy,
              totalAmount,
              customerId: JSON.parse(localStorage.getItem("user"))?._id,
              customerLocation
            });

            if (result.data.success) {
              toast.success("Order placed successfully!");
              setCartItems([]);
              navigate("/orders");
            } else {
              toast.error("Payment verification failed.");
            }
          } catch (err) {
            console.error(err);
            toast.error("Payment verification error.");
          }
        },

        modal: {
          ondismiss: function () {
            toast.info("Payment cancelled.");
          },
        },
      };

      new window.Razorpay(options).open();
    } catch (error) {
      console.error(error);
      toast.error("Payment failed!");
    }
  };

  return (
    <div className="customer-dashboard">
      {/* Banner Carousel*/}
      <section
        className="banner-section"
        style={{ height: "50vh", overflow: "hidden" }}
      >
        <div
          id="bannerCarousel"
          className="carousel slide h-100"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner h-100">
            {topItemsFromEachCategory.map((item, idx) => (
              <div
                key={idx}
                className={`carousel-item ${idx === 0 ? "active" : ""} h-100`}
              >
                <img
                  src={item.image}
                  className="d-block w-100 h-100"
                  alt={`Slide ${idx + 1}`}
                  style={{ objectFit: "cover" }}
                />
                <div className="carousel-caption d-none d-md-block">
                  <h2 className="fw-bold text-white">{item.name}</h2>
                  <p className="text-white">
                    Order from your favorite restaurants nearby!
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#bannerCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#bannerCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </section>

      {/*Explore  top rated*/}
      {topRated && (
        <section
          className="menu-section bg-light py-4 mb-5"
          style={{ height: "50vh" }}
        >
          <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-3 px-3">
              <h3 className="fw-bold mb-0">Explore top menu 🍴</h3>
              <a
                href="#"
                className="text-info fw-semibold text-decoration-none"
              >
                View All
              </a>
            </div>
            <div
              className="d-flex flex-row overflow-auto pb-3 px-3"
              style={{ scrollBehavior: "smooth" }}
            >
              {topRated.map((dish, idx) => (
                <div
                  key={idx}
                  className="card me-3 flex-shrink-0 shadow-sm border-0"
                  style={{
                    minWidth: "220px",
                    borderRadius: "15px",
                    transition: "transform 0.3s",
                  }}
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="card-img-top rounded-top-3"
                    style={{
                      height: "150px",
                      objectFit: "cover",
                      borderTopLeftRadius: "15px",
                      borderTopRightRadius: "15px",
                    }}
                  />
                  <div className="card-body text-center">
                    <h6 className="fw-bold">{dish.name}</h6>
                    <div className="d-flex justify-content-between">
                      <p>price: ${dish.price}</p>
                      <p>Rating: 4.2</p>
                    </div>
                    <button
                      className={`btn btn-sm mt-2 ${
                        cartItems.some((item) => item._id === dish._id)
                          ? "btn-outline-info text-secondary"
                          : "btn-info text-white"
                      }`}
                      // disabled={cartItems.some((item) => item._id === dish._id)}
                      onClick={() => handleCart(dish)}
                    >
                      {cartItems.some((item) => item._id === dish._id)
                        ? "- Remove From Cart"
                        : "+ Add To Cart"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {categoryWiseItems &&
        categoryWiseItems.length > 0 &&
        categoryWiseItems.map((category, idx) => {
          const categoryName = Object.keys(category)[0];
          const dishes = category[categoryName];

          return (
            <section className="menu-section bg-light py-4" key={idx}>
              <div className="container-fluid">
                <div className="d-flex justify-content-between align-items-center mb-3 px-3">
                  <h3 className="fw-bold mb-0">
                    Explore Our {categoryName} 🍴
                  </h3>
                  <a
                    href="#"
                    className="text-info fw-semibold text-decoration-none"
                  >
                    View All
                  </a>
                </div>

                <div
                  className="d-flex flex-row overflow-auto pb-3 px-3"
                  style={{ scrollBehavior: "smooth" }}
                >
                  {dishes.map((dish, i) => (
                    <div
                      key={i}
                      className="card me-3 flex-shrink-0 shadow-sm border-0"
                      style={{
                        minWidth: "220px",
                        borderRadius: "15px",
                        transition: "transform 0.3s",
                      }}
                    >
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="card-img-top rounded-top-3"
                        style={{
                          height: "150px",
                          objectFit: "cover",
                          borderTopLeftRadius: "15px",
                          borderTopRightRadius: "15px",
                        }}
                      />

                      <div className="card-body text-center">
                        <h6 className="fw-bold">{dish.name}</h6>
                        <div className="d-flex justify-content-between">
                          <p>price: ${dish.price}</p>
                          <p>Rating: 4.2</p>
                        </div>
                        <button
                          className={`btn btn-sm mt-2 ${
                            cartItems.some((item) => item._id === dish._id)
                              ? "btn-outline-info text-secondary"
                              : "btn-info text-white"
                          }`}
                          // disabled={cartItems.some(
                          //   (item) => item._id === dish._id
                          // )}
                          onClick={() => handleCart(dish)}
                        >
                          {cartItems.some((item) => item._id === dish._id)
                            ? "- Remove From Cart"
                            : "+ Add To Cart"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

      {/* order modal */}
      <div
        className="modal fade"
        id="OrdersModal"
        tabIndex="-1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-hidden="true"
        ref={ordersModalRef}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title">Order Your Dishes</h5>
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
              {cartItems.length === 0 ? (
                <p className="text-center text-muted">Your cart is empty!</p>
              ) : (
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">Dish</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((dish) => (
                        <tr key={dish._id}>
                          <td className="d-flex align-items-center">
                            <img
                              src={dish.image}
                              alt={dish.name}
                              style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover",
                                borderRadius: "5px",
                                marginRight: "10px",
                              }}
                            />
                            <span>{dish.name}</span>
                          </td>
                          <td>${dish.price.toFixed(2)}</td>
                          <td>
                            {/* Quantity Control */}
                            <div className="d-flex justify-contentbetween">
                              <button
                                className="btn btn-outline-success"
                                onClick={() =>
                                  updateDishQuantity(dish._id, "add")
                                }
                              >
                                {" "}
                                +{" "}
                              </button>
                              <input
                                type="text"
                                value={dish.quantity}
                                className="form-control form-control-sm text-center mx-1"
                                style={{ width: "50px" }}
                                readOnly
                              />
                              <button
                                className="btn btn-outline-warning"
                                onClick={() =>
                                  updateDishQuantity(dish._id, "remove")
                                }
                              >
                                {" "}
                                -{" "}
                              </button>
                            </div>
                          </td>
                          <td>
                            ${(dish.price * (dish.quantity || 1)).toFixed(2)}
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleCart(dish)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Total Amount */}
                  <div className="d-flex justify-content-end mt-3">
                    <h5>
                      Total: $
                      {cartItems
                        .reduce(
                          (sum, item) =>
                            sum + item.price * (item.quantity || 1),
                          0
                        )
                        .toFixed(2)}
                    </h5>
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn btn-danger" data-bs-dismiss="modal">
                Close
              </button>
              <button
                className="btn btn-success"
                disabled={cartItems.length === 0}
                onClick={(e) => handlePayNow(e)}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* payment modal */}
      {/* <div
        className="modal fade"
        id="PaymentModal"
        tabIndex="-1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        ref={paymentModalRef}
      >
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Payment</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <p>Payment details go here...</p>
              <p>
                Total: $
                {cartItems
                  .reduce((sum, item) => sum + item.price * item.quantity, 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button className="btn btn-success">Pay Now</button>
            </div>
          </div>
        </div>
      </div> */}

      <OrderButton onClick={handleOrders} />
    </div>
  );
}

export default CustomerDashboard;
