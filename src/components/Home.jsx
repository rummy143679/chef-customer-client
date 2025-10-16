import AdminDashboard from "./AdminDashboard";
import ChefDashboard from "./ChefDashboard";
import CustomerDashboard from "./CustomerDashboard";
import Navbar from "./Navbar";

function Home() {
  return (
    <>
      {/* Your Navbar Here */}
      <div className="mb-4">
        <Navbar role="customer" />
      </div>
      <main>
        {/* <AdminDashboard />
        <ChefDashboard /> */}
        <CustomerDashboard/>
      </main>
    </>
  );
}

export default Home;
