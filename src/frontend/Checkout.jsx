import React from "react";
import { Link } from "react-router-dom";

export default function Checkout({ cartItems }) {
  // Calculate total
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-white/70 backdrop-blur-md rounded-xl shadow-lg">
      <h2 className="text-4xl font-bold text-orange-600 mb-8">Checkout</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-700 mb-6">Your cart is empty!</p>
      ) : (
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Order Summary</h3>

          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <h4 className="font-medium text-gray-700">{item.name}</h4>
                  <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                </div>
                <p className="text-orange-600 font-bold">${item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center text-lg font-bold mb-6">
            <span>Total:</span>
            <span>${total}</span>
          </div>

          <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition mb-4">
            Confirm Order
          </button>

          <Link to="/store" className="text-center text-orange-600 hover:underline">
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
