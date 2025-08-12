import { useContext } from "react";
import freshlogo from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { CartContext } from "./../../Context/CartContext";

function Navbar() {
  const { numberOfCartItems } = useContext(CartContext);
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  function handleLogout() {
    // Clear the token from localStorage and context
    localStorage.removeItem("userToken");
    setToken(null); // To Update UI
    navigate("/login"); // Redirect to login page
  }
  return (
    <nav className="navbar bg-white shadow-md mb-8 ">
      <div className="container flex justify-between items-center px-4 py-3 mx-auto w-full ">
        {/* Left Nav */}
        <div className="left-nav flex items-center gap-4">
          <Link to="/products" className="flex items-center">
            <img src={freshlogo} alt="FreshCart Cart" className="h-8 w-auto" />
          </Link>
          {/* Navbar Links Of the E-Commerce */}
          {token ? (
            <ul className="hidden md:flex items-center space-x-6 font-medium">
              <li>
                <NavLink
                  to="/products"
                  className="hover:text-green-600 transition-colors duration-300"
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/categories"
                  className="hover:text-green-600 transition-colors duration-300"
                >
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/brands"
                  className="hover:text-green-600 transition-colors duration-300"
                >
                  Brands
                </NavLink>
              </li>
            </ul>
          ) : null}
        </div>
        {/* Right Nav */}
        <div className="right-nav flex items-center gap-4 ml-auto ">
          {/* Cart Icon */}
          {token && (
            <NavLink
              to="/cart"
              className="relative group flex items-center justify-center"
              aria-label="Cart"
            >
              <svg
                className="w-7 h-7 text-gray-700 group-hover:text-green-600 transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <circle cx="9" cy="21" r="1.5" />
                <circle cx="19" cy="21" r="1.5" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 6h2l1.68 9.39a2 2 0 0 0 2 1.61h6.72a2 2 0 0 0 2-1.61L21 8H7"
                />
              </svg>
              {/* Example badge for cart items, replace 0 with cart count if available */}
              <span className="absolute -top-1 -right-2 bg-green-600 text-white text-xs rounded-full px-1.5 py-0.5">
                {numberOfCartItems || 0}
              </span>
            </NavLink>
          )}

          <ul className="flex items-center gap-2.5 font-medium">
            {token ? (
              <li>
                <span
                  className="cursor-pointer hover:text-red-600 transition-colors duration-300 border-b-2 border-transparent hover:border-red-600 font-semibold"
                  onClick={handleLogout}
                >
                  Log out
                </span>
              </li>
            ) : (
              <>
                <li className="hover:text-green-600 transition-colors duration-300">
                  <NavLink to="/register">Register</NavLink>
                </li>
                <li className="hover:text-green-600 transition-colors duration-300">
                  <NavLink to="/login">Login</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          {/* You can implement a hamburger menu here if needed */}
        </div>
      </div>

      {/* Mobile Nav Links */}
      {token && (
        <div className="md:hidden  px-4 pb-2">
          <ul className="flex  flex-col gap-2 font-medium">
            <li>
              <NavLink
                to="/products"
                className="hover:text-green-600 transition-colors duration-300 block py-1"
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categories"
                className="hover:text-green-600 transition-colors duration-300 block py-1"
              >
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/brands"
                className="hover:text-green-600 transition-colors duration-300 block py-1"
              >
                Brands
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                className="hover:text-green-600 transition-colors duration-300 flex items-center gap-2 py-1"
              >
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <circle cx="9" cy="21" r="1.5" />
                  <circle cx="19" cy="21" r="1.5" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 6h2l1.68 9.39a2 2 0 0 0 2 1.61h6.72a2 2 0 0 0 2-1.61L21 8H7"
                  />
                </svg>
                Cart
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
