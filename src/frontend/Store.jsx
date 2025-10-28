import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch } from "react-icons/fi";

export default function Store({ addToCart }) {
  const products = [
    { id: 1, name: "Wireless Headphones", price: 99, img: "/images/headphones.jpg" },
    { id: 2, name: "Smart Watch", price: 199, img: "/images/smartwatch.jpg" },
    { id: 3, name: "Smart Glasees", price: 49, img: "/images/glasses.jpg" },
    { id: 4, name: "Mechanical Keyboard", price: 129, img: "/images/keyboard.jpg" },
    { id: 5, name: "Laptop Stand", price: 39, img: "/images/laptop-stand.jpg" },
    { id: 6, name: "Portable Speaker", price: 79, img: "/images/speaker.jpg" },
  ];

  const [index, setIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [flyingItem, setFlyingItem] = useState(null);

  const filteredProducts = useMemo(
    () => products.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [searchTerm]
  );

  const product = filteredProducts[index % filteredProducts.length];
  const containerRef = useRef(null);

  const nextProduct = () => setIndex((i) => (i + 1) % filteredProducts.length);
  const prevProduct = () => setIndex((i) => (i - 1 + filteredProducts.length) % filteredProducts.length);

  const handleAddToCart = (product, imgRef) => {
    if (!imgRef.current) return;

    const imgRect = imgRef.current.getBoundingClientRect();
    const cart = document.querySelector(".cart-icon")?.getBoundingClientRect();
    if (!cart) return addToCart(product);

    // Starting position of the image
    const startX = imgRect.left + imgRect.width / 2;
    const startY = imgRect.top + imgRect.height / 2;

    // End position at the cart icon
    const endX = cart.left + cart.width / 2;
    const endY = cart.top + cart.height / 2;

    // Save animation data
    setFlyingItem({
      img: product.img,
      x: startX,
      y: startY,
      endX,
      endY,
      id: product.id,
    });

    // Trigger cart logic slightly after animation starts
    setTimeout(() => addToCart(product), 400);
  };

  return (
    <div
      className="flex flex-col items-center justify-center text-center min-h-[80vh] px-6 relative overflow-hidden"
      ref={containerRef}
    >
      {/* Title */}
      <motion.h2
        className="text-5xl font-extrabold text-orange-600 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Our Collection
      </motion.h2>

      <p className="text-gray-700 max-w-xl mb-10">
        Discover high-quality tech gear — crafted for performance, durability, and design.
      </p>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md mb-10"
      >
        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => {
            setIndex(0);
            setSearchTerm(e.target.value);
          }}
          className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/30 backdrop-blur-md border border-white/50 text-gray-800 placeholder-gray-500 shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
        />
      </motion.div>

      {/* Product Showcase */}
      {filteredProducts.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-500 italic"
        >
          No products found for "{searchTerm}"
        </motion.p>
      ) : (
        <div className="relative w-full max-w-lg flex items-center justify-center">
          <AnimatePresence mode="wait">
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          </AnimatePresence>

          {/* Navigation Arrows */}
          {filteredProducts.length > 1 && (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="absolute left-0 text-3xl font-bold text-orange-600 hover:text-orange-700 p-4"
                onClick={prevProduct}
              >
                ‹
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="absolute right-0 text-3xl font-bold text-orange-600 hover:text-orange-700 p-4"
                onClick={nextProduct}
              >
                ›
              </motion.button>
            </>
          )}
        </div>
      )}

      {/* Progress Dots */}
      {filteredProducts.length > 1 && (
        <div className="flex space-x-2 mt-8">
          {filteredProducts.map((_, i) => (
            <motion.div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === index % filteredProducts.length
                  ? "bg-orange-600"
                  : "bg-gray-300"
              }`}
              animate={{
                scale: i === index % filteredProducts.length ? 1.2 : 1,
              }}
            />
          ))}
        </div>
      )}

      {/* Flying image animation */}
      <AnimatePresence>
        {flyingItem && (
          <motion.img
            key={flyingItem.id}
            src={flyingItem.img}
            alt="flying item"
            initial={{
              position: "fixed",
              top: flyingItem.y,
              left: flyingItem.x,
              width: 80,
              height: 80,
              borderRadius: "12px",
              zIndex: 1000,
            }}
            animate={{
              top: flyingItem.endY,
              left: flyingItem.endX,
              width: 20,
              height: 20,
              opacity: 0,
              scale: 0.5,
              transition: { duration: 1.3, ease: "easeInOut" },
            }}
            onAnimationComplete={() => setFlyingItem(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ProductCard({ product, onAddToCart }) {
  const imgRef = useRef(null);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -100, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="flex flex-col items-center bg-white/80 backdrop-blur-lg p-6 rounded-3xl shadow-xl w-full"
    >
      <motion.img
        ref={imgRef}
        src={product.img}
        alt={product.name}
        className="w-64 h-64 object-cover rounded-2xl mb-6"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      />
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">{product.name}</h3>
      <p className="text-orange-600 font-bold text-xl mb-6">${product.price}</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onAddToCart(product, imgRef)}
        className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
      >
        Add to Cart
      </motion.button>
    </motion.div>
  );
}
