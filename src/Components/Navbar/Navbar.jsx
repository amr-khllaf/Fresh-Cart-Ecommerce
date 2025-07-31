import { useContext } from "react";
import freshlogo from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";

function Navbar() {
  const { token, setToken } = useContext(authContext);
  const navigate = useNavigate();
  function handleLogout() {
    // Clear the token from localStorage and context
    localStorage.removeItem("userToken");
    setToken(null); // To Update UI
    navigate("/login"); // Redirect to login page
  }
  return (
    <nav className="navbar bg-gray-100 shadow-md mb-8 ">
      <div className="container flex justify-between items-center p-4   mx-auto">
        {/* Left Nav */}
        <div
          className="
      left-nav flex items-center gap-4 "
        >
          <Link to="/products">
            <img src={freshlogo} alt="FreshCart Cart" />
          </Link>
          {/* Navbar Links Of the E-Commerce */}
          {token ? (
            <ul className="flex items-center space-x-4">
              <li>
                <NavLink
                  to="/products"
                  className="hover:text-gray-600 transition duration-400 "
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/categories"
                  className="hover:text-gray-600 transition duration-400"
                >
                  Categories
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/brands"
                  className="hover:text-gray-600 transition duration-400"
                >
                  Brands
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/cart"
                  className="hover:text-gray-600 transition duration-400"
                >
                  Cart
                </NavLink>
              </li>
            </ul>
          ) : null}
        </div>

        {/* Right Nav */}
        <div className="right-nav flex items-center gap-4">
          {/* Conditional rendering based on authentication */}

          <ul className="flex items-center gap-2.5 ">
            {token ? (
              <li>
                <span
                  className="cursor-pointer hover:text-red-600 transition duration-400 border-b-2 border-transparent hover:border-red-600 font-semibold"
                  onClick={handleLogout}
                >
                  Log out
                </span>
              </li>
            ) : (
              <>
                <li className="hover:text-green-600 transition duration-400">
                  <NavLink to="/register">Register</NavLink>
                </li>
                <li className="hover:text-green-600 transition duration-400">
                  <NavLink to="/login">Login</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
