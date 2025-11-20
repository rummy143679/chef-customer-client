import DeliveryDashboard from "../pages/delivery-page/Delivery";
import AdminDashboard from "./AdminDashboard";
import ChefDashboard from "./ChefDashboard";
import CustomerDashboard from "./CustomerDashboard";
import Navbar from "./Navbar";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {/* Your Navbar Here */}
      {/* <div className="mb-4">
        <Navbar role={user.role} />
      </div> */}
      <main>
        <Navbar role={user.role} />
        <div className="container min-vh-100 bg-light">
          {user.role === "admin" && <AdminDashboard />}
          {user.role === "chef" && <ChefDashboard />}
          {user.role === "customer" && <CustomerDashboard />}
          {user.role === "delivery" && <DeliveryDashboard />}
        </div>
      </main>
    </>
  );
}

export default Home;
