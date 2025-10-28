import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiGrid, FiLayout } from "react-icons/fi";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

export default function Store({ addToCart }) {
  const products = [
    { id: 1, name: "Wireless Headphones", price: 99, img: "/images/headphones.jpg", rating: 4.5, tag: "Hot" },
    { id: 2, name: "Smart Watch", price: 199, img: "/images/smartwatch.jpg", rating: 4.7, tag: "New" },
    { id: 3, name: "Smart Glasses", price: 49, img: "/images/glasses.jpg", rating: 3.9 },
    { id: 4, name: "Mechanical Keyboard", price: 129, img: "/images/keyboard.jpg", rating: 4.8 },
    { id: 5, name: "Laptop Stand", price: 39, img: "/images/laptop-stand.jpg", rating: 4.2 },
    { id: 6, name: "Portable Speaker", price: 79, img: "/images/speaker.jpg", rating: 4.4 },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [gridView, setGridView] = useState(false);
  const [sortOrder, setSortOrder] = useState("default");
  const [flyingItem, setFlyingItem] = useState(null);

  const containerRef = useRef(null);

  // --- Filter + sort logic ---
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOrder === "price-low") filtered.sort((a, b) => a.price - b.price);
    if (sortOrder === "price-high") filtered.sort((a, b) => b.price - a.price);
    if (sortOrder === "rating") filtered.sort((a, b) => b.rating - a.rating);

    return filtered;
  }, [products, searchTerm, sortOrder]);

  // --- Add to cart animation ---
  const handleAddToCart = (product, imgRef) => {
    if (!imgRef.current) return;

    const imgRect = imgRef.current.getBoundingClientRect();
    const cart = document.querySelector(".cart-icon")?.getBoundingClientRect();
    if (!cart) return addToCart(product);

    const startX = imgRect.left + imgRect.width / 2;
    const startY = imgRect.top + imgRect.height / 2;
    const endX = cart.left + cart.width / 2;
    const endY = cart.top + cart.height / 2;

    setFlyingItem({
      img: product.img,
      x: startX,
      y: startY,
      endX,
      endY,
      id: product.id,
    });

    setTimeout(() => addToCart(product), 400);
  };

  return (
    <div
      className="flex flex-col items-center justify-center text-center min-h-[80vh] px-6 relative overflow-hidden"
      ref={containerRef}
    >
      {/* Title */}
      <motion.h2
        className="text-5xl font-extrabold text-orange-600 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Our Collection
      </motion.h2>

      <p className="text-gray-700 max-w-xl mb-8">
        Discover high-quality tech gear — crafted for performance, durability, and design.
      </p>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
        {/* Search */}
        <div className="relative w-full max-w-md">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/30 backdrop-blur-md border border-white/50 text-gray-800 placeholder-gray-500 shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
          />
        </div>

        {/* Sort Dropdown */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-4 py-3 rounded-2xl bg-white/30 backdrop-blur-md border border-white/50 text-gray-800 shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
        >
          <option value="default">Sort by</option>
          <option value="price-low">Price: Low → High</option>
          <option value="price-high">Price: High → Low</option>
          <option value="rating">Rating</option>
        </select>

        {/* View Toggle */}
        <div className="flex space-x-3">
          <button
            onClick={() => setGridView(false)}
            className={`p-3 rounded-xl ${
              !gridView ? "bg-orange-600 text-white" : "bg-white/30 text-gray-600"
            } transition`}
          >
            <FiLayout />
          </button>
          <button
            onClick={() => setGridView(true)}
            className={`p-3 rounded-xl ${
              gridView ? "bg-orange-600 text-white" : "bg-white/30 text-gray-600"
            } transition`}
          >
            <FiGrid />
          </button>
        </div>
      </div>

      {/* Products */}
      <AnimatePresence mode="wait">
        {filteredProducts.length === 0 ? (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-gray-500 italic mt-12"
          >
            No products found for "{searchTerm}"
          </motion.p>
        ) : gridView ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl"
          >
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} />
            ))}
          </motion.div>
        ) : (
          <motion.div key="carousel" className="relative w-full max-w-lg flex items-center justify-center">
            <ProductCarousel products={filteredProducts} onAddToCart={handleAddToCart} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flying Image Animation */}
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

// --- Product Grid Card ---
function ProductCard({ product, onAddToCart }) {
  const imgRef = useRef(null);
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (product.rating >= i + 1) return <BsStarFill key={i} className="text-orange-500" />;
    if (product.rating >= i + 0.5) return <BsStarHalf key={i} className="text-orange-500" />;
    return <BsStar key={i} className="text-gray-300" />;
  });

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="flex flex-col items-center bg-white/70 backdrop-blur-lg p-6 rounded-3xl shadow-xl relative overflow-hidden"
    >
      {product.tag && (
        <span className="absolute top-4 left-4 bg-orange-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
          {product.tag}
        </span>
      )}
      <img ref={imgRef} src={product.img} alt={product.name} className="w-48 h-48 object-cover rounded-2xl mb-4" />
      <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
      <div className="flex justify-center mt-2">{stars}</div>
      <p className="text-orange-600 font-bold text-lg mt-2">${product.price}</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onAddToCart(product, imgRef)}
        className="bg-orange-600 text-white px-6 py-2 mt-4 rounded-lg font-semibold hover:bg-orange-700 transition"
      >
        Add to Cart
      </motion.button>
    </motion.div>
  );
}

// --- Carousel (your original style preserved) ---
function ProductCarousel({ products, onAddToCart }) {
  const [index, setIndex] = useState(0);
  const product = products[index % products.length];
  const next = () => setIndex((i) => (i + 1) % products.length);
  const prev = () => setIndex((i) => (i - 1 + products.length) % products.length);

  return (
    <div className="relative w-full flex items-center justify-center">
      <AnimatePresence mode="wait">
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      </AnimatePresence>

      {products.length > 1 && (
        <>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="absolute left-0 text-3xl font-bold text-orange-600 hover:text-orange-700 p-4"
            onClick={prev}
          >
            ‹
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="absolute right-0 text-3xl font-bold text-orange-600 hover:text-orange-700 p-4"
            onClick={next}
          >
            ›
          </motion.button>
        </>
      )}
    </div>
  );
}
