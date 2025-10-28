import React, { useState } from "react";

export default function PaymentDetails({ cartItems }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    paymentMethod: "card",
  });

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Order placed successfully!");
    // Later: send data to backend/payment gateway
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-white/70 backdrop-blur-md rounded-xl shadow-lg">
      <h2 className="text-4xl font-bold text-orange-600 mb-8">Payment & Delivery</h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 space-y-8"
      >
        {/* USER DETAILS */}
        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Your Details</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none md:col-span-2"
            />
          </div>
        </section>

        {/* DELIVERY INFO */}
        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Delivery Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="address"
              placeholder="Street Address"
              value={formData.address}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none md:col-span-2"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
            />
            <input
              type="text"
              name="zip"
              placeholder="ZIP / Postal Code"
              value={formData.zip}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none md:col-span-2"
            />
          </div>
        </section>

        {/* PAYMENT METHODS */}
        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Payment Method</h3>
          <div className="flex flex-col md:flex-row gap-4">
            {[
              { id: "card", label: "Credit / Debit Card" },
              { id: "applepay", label: "Apple Pay" },
              { id: "googlepay", label: "Google Pay" },
              { id: "paypal", label: "PayPal" },
              { id: "cod", label: "Cash on Delivery" },
            ].map((option) => (
              <label
                key={option.id}
                className={`flex items-center border rounded-lg px-4 py-2 cursor-pointer transition ${
                  formData.paymentMethod === option.id
                    ? "border-orange-600 bg-orange-50"
                    : "border-gray-300 hover:border-orange-400"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={option.id}
                  checked={formData.paymentMethod === option.id}
                  onChange={handleChange}
                  className="mr-2 accent-orange-600"
                />
                {option.label}
              </label>
            ))}
          </div>
        </section>

        {/* ORDER SUMMARY */}
        <section className="pt-4 border-t">
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
          >
            Place Order
          </button>
        </section>
      </form>
    </div>
  );
}
