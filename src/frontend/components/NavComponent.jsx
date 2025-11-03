import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FaMoon, FaSun } from "react-icons/fa";

export default function NavComponent({ cartItems, toggleCart, darkMode, toggleTheme }) {
  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4
        backdrop-blur-md shadow-md transition-colors duration-500
        ${darkMode ? "bg-gray-900/70 text-gray-100" : "bg-white/70 text-gray-900"}
      `}
    >
      {/* Brand */}
      <h1 className="text-2xl font-bold text-orange-600 font-custom">
        Typo.exe
      </h1>

      {/* Links */}
      <div className="flex items-center space-x-6 mr-20">
        <Link
          to="/"
          className={`font-medium transition-colors hover:text-orange-600 ${
            darkMode ? "text-gray-200" : "text-gray-800"
          }`}
        >
          Home
        </Link>
        <Link
          to="/store"
          className={`font-medium transition-colors hover:text-orange-600 ${
            darkMode ? "text-gray-200" : "text-gray-800"
          }`}
        >
          Store
        </Link>
        <Link
          to="/about"
          className={`font-medium transition-colors hover:text-orange-600 ${
            darkMode ? "text-gray-200" : "text-gray-800"
          }`}
        >
          About
        </Link>
      </div>

      {/* Right Controls (Cart + Theme Toggle) */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex items-center space-x-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`p-21 rounded-full border transition-all duration-300
            ${darkMode
              ? "bg-gray-800 border-gray-600 hover:bg-gray-700 text-yellow-400"
              : "bg-gray-200 border-gray-300 hover:bg-gray-300 text-gray-800"
            }`}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? <FaMoon /> : <FaSun />}
        </button>

        {/* Cart */}
        <button
          className="cart-icon relative p-2 bg-orange-600 text-white rounded-full 
                     hover:bg-orange-700 transition"
          onClick={toggleCart}
        >
          <FaShoppingCart className="w-5 h-5" />
          <span
            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold 
                       rounded-full w-5 h-5 flex items-center justify-center"
          >
            {cartItems.length}
          </span>
        </button>
      </div>
    </nav>
  );
}
