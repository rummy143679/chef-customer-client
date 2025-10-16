import React from "react";

function CustomerDashboard() {
  const dishes = [
    {
      name: "Pizza Margherita",
      img: "https://images.unsplash.com/photo-1601924582975-0e1cfe1f22e4?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Paneer Butter Masala",
      img: "https://images.unsplash.com/photo-1604908177520-1edc98b2e1f5?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Veg Burger",
      img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Chocolate Dessert",
      img: "https://images.unsplash.com/photo-1599785209797-df4b0f3a1fc4?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Sushi Platter",
      img: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Fresh Drinks",
      img: "https://images.unsplash.com/photo-1562967916-eb82221dfb26?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Tandoori Chicken",
      img: "https://images.unsplash.com/photo-1626082927389-6c09ddff75e0?auto=format&fit=crop&w=800&q=80",
    },
  ];

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
            {[
              "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1500&q=80",
              "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1500&q=80",
              "https://images.unsplash.com/photo-1559628233-4d05f6f7b272?auto=format&fit=crop&w=1500&q=80",
            ].map((img, idx) => (
              <div
                key={idx}
                className={`carousel-item ${idx === 0 ? "active" : ""} h-100`}
              >
                <img
                  src={img}
                  className="d-block w-100 h-100"
                  alt={`Slide ${idx + 1}`}
                  style={{ objectFit: "cover" }}
                />
                <div className="carousel-caption d-none d-md-block">
                  <h2 className="fw-bold text-white">
                    Delicious Food Delivered
                  </h2>
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

      {/*Explore Menu Section*/}
      <section
        className="menu-section bg-light py-4"
        style={{ height: "50vh" }}
      >
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center mb-3 px-3">
            <h3 className="fw-bold mb-0">Explore Our Menu 🍴</h3>
            <a href="#" className="text-info fw-semibold text-decoration-none">
              View All
            </a>
          </div>
          <div
            className="d-flex flex-row overflow-auto pb-3 px-3"
            style={{ scrollBehavior: "smooth" }}
          >
            {dishes.map((dish, idx) => (
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
                  src={dish.img}
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
                  <button className="btn btn-sm btn-info text-white mt-2">
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default CustomerDashboard;
