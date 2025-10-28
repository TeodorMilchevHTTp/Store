export default function Store({ addToCart }) {
  const products = [
    { id: 1, name: "Wireless Headphones", price: 99, img: "/images/headphones.jpg" },
    { id: 2, name: "Smart Watch", price: 199, img: "/images/smartwatch.jpg" },
    { id: 3, name: "Gaming Mouse", price: 49, img: "/images/mouse.jpg" },
    { id: 4, name: "Mechanical Keyboard", price: 129, img: "/images/keyboard.jpg" },
    { id: 5, name: "Laptop Stand", price: 39, img: "/images/laptop-stand.jpg" },
    { id: 6, name: "Portable Speaker", price: 79, img: "/images/speaker.jpg" },
  ];

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[80vh] px-4 py-12 bg-white/70 backdrop-blur-md rounded-xl shadow-lg">
      <h2 className="text-4xl font-bold text-orange-600 mb-8">Our Products</h2>
      <p className="text-gray-700 max-w-xl mb-12">
        Explore our premium selection of products. High quality, stylish design, and excellent usability.
      </p>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition shadow-gray-300"
          >
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-6 flex flex-col items-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-orange-600 font-bold text-lg mb-4">${product.price}</p>
              <button
                className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
