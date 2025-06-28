import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({
    fullName: "",
  });
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Subscription", href: "/subscription" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) =>
    href === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(href);

  const handleLogout = () => {
    setIsOpen(false);
    setUser({ fullName: "Halo" });
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-[#3E9C5A]">
            SEA CATERING
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all ${
                  isActive(item.href)
                    ? "text-[#3E9C5A] border-b-2 border-[#3E9C5A]"
                    : "text-gray-700 hover:text-[#3E9C5A] hover:bg-gray-100"
                }`}
              >
                {item.name}
              </Link>
            ))}
            {user.fullName ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700 flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {user.fullName}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 text-sm border border-[#3E9C5A] text-[#3E9C5A] rounded-md hover:bg-[#3E9C5A] hover:text-white transition"
                >
                  <LogOut className="w-4 h-4 inline-block mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <button className="px-3 py-1 text-sm border border-[#3E9C5A] text-[#3E9C5A] rounded-md hover:bg-[#3E9C5A] hover:text-white transition">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="px-3 py-1 text-sm bg-[#3E9C5A] text-white rounded-md hover:bg-[#347D4A] transition">
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[#3E9C5A] focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.href)
                    ? "text-[#3E9C5A] bg-gray-100"
                    : "text-gray-700 hover:text-[#3E9C5A] hover:bg-gray-100"
                }`}
              >
                {item.name}
              </Link>
            ))}
            {user ? (
              <>
                <div className="flex items-center px-3 py-2 text-sm text-gray-700">
                  <User className="w-4 h-4 mr-2" />
                  {user.fullName}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-md text-base text-gray-700 hover:text-[#3E9C5A] hover:bg-gray-100 flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#3E9C5A] hover:bg-gray-100"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#3E9C5A] hover:bg-gray-100"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
