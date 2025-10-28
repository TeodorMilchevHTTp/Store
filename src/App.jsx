import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Dashboard from "./frontend/Dashboard";
import Store from "./frontend/Store";
import About from "./frontend/About";
import Checkout from "./frontend/Checkout";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleCart = () => setCartOpen(!cartOpen);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="relative flex flex-col text-gray-900 min-h-screen">
      {/* Background */}
      <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: "url('/images/background.jpg')" }}
      />

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white/70 backdrop-blur-md shadow-md relative">
        <h1 className="text-2xl font-bold text-orange-600 font-custom">Typo.exe</h1>

        <div className="flex items-center space-x-6 mr-20">
          <Link to="/" className="hover:text-orange-600 font-medium">Home</Link>
          <Link to="/store" className="hover:text-orange-600 font-medium">Store</Link>
          <Link to="/about" className="hover:text-orange-600 font-medium">About</Link>
        </div>

        <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
          <button
            className="relative p-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition"
            onClick={toggleCart}
          >
            <FaShoppingCart className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          </button>
        </div>
      </nav>

      {/* Page Content */}
      <div className="flex-1 pt-20">
        <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Dashboard /></PageWrapper>} />
          <Route path="/store" element={<PageWrapper><Store addToCart={addToCart} /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
          <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
        </Routes>
        </AnimatePresence>
      </div>

      {/* Animated Cart Panel */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={toggleCart}
            />

            <motion.div
              initial={{ x: "100%", rotate: 45, scale: 0.5 }}
              animate={{ x: 0, rotate: 0, scale: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="fixed top-0 right-0 w-96 h-full bg-white shadow-2xl p-6 z-50 rounded-l-3xl overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-orange-600">Your Cart</h2>
                <button
                  onClick={toggleCart}
                  className="text-gray-500 hover:text-gray-800 text-xl font-bold"
                >
                  &times;
                </button>
              </div>

              {cartItems.length === 0 ? (
                <p className="text-gray-700">Your cart is empty!</p>
              ) : (
                <>
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center p-4 bg-gray-100 rounded-lg shadow"
                      >
                        <img src={item.img} alt={item.name} className="w-16 h-16 rounded mr-4" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{item.name}</h3>
                          <p className="text-orange-600 font-bold">${item.price}</p>
                          <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-4 text-red-500 font-bold hover:text-red-700"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Subtotal */}
                  <div className="flex justify-between items-center text-lg font-bold mt-6 mb-4">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  {/* Checkout button */}
                  <button
                    onClick={() => {
                      toggleCart();
                      navigate("/checkout");
                    }}
                    className="w-full bg-orange-600 text-white font-semibold py-3 rounded-lg hover:bg-orange-700 transition"
                  >
                    Checkout
                  </button>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function PageWrapper({ children }) {
  return (
    <motion.div
      className="flex-1 flex flex-col justify-center items-center text-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
