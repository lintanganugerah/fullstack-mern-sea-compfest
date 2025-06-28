import { Outlet } from "react-router-dom"; // ⬅️ import Outlet
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <Outlet />{" "}
      </main>
      <footer className="bg-[#3E9C5A] text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">SEA CATERING</h3>
              <p className="text-sm opacity-90">
                Healthy Meals, Anytime, Anywhere
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <p className="text-sm opacity-90">Manager: Brian</p>
              <p className="text-sm opacity-90">Phone: 08123456789</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Service Areas</h4>
              <p className="text-sm opacity-90">
                Delivering across major cities in Indonesia
              </p>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-sm opacity-90">
              &copy; 2024 SEA Catering. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
