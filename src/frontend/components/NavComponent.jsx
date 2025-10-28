import { Link } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";

export default function NavComponent({ cartItems, toggleCart }) {
  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 
                 bg-white/70 backdrop-blur-md shadow-md"
    >
      {/* Brand */}
      <h1 className="text-2xl font-bold text-orange-600 font-custom">
        Typo.exe
      </h1>

      {/* Links */}
      <div className="flex items-center space-x-6 mr-20">
        <Link to="/" className="hover:text-orange-600 font-medium transition-colors">Home</Link>
        <Link to="/store" className="hover:text-orange-600 font-medium transition-colors">Store</Link>
        <Link to="/about" className="hover:text-orange-600 font-medium transition-colors">About</Link>
      </div>

      {/* Cart */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
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
