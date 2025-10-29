import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // --- Static admin credentials ---
    if (username === "admin" && password === "admin") {
      localStorage.setItem("userRole", "admin");
      navigate("/admin");
      return;
    }

    // --- Mock user login (non-admin) ---
    if (username.trim() && password.trim()) {
      localStorage.setItem("userRole", "user");
      navigate("/store");
    } else {
      setError("Please enter a valid username and password.");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen text-gray-900 overflow-hidden">

      {/* Subtle overlay for readability */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm -z-10" />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl p-10 w-[90%] max-w-md text-center border border-white/40"
      >
        <h2 className="text-4xl font-bold text-orange-600 mb-6">Welcome Back</h2>
        <p className="text-gray-600 mb-8">Login to your Typo.exe account</p>

        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-3 rounded-2xl bg-white border border-gray-200 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 rounded-2xl bg-white border border-gray-200 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="bg-orange-600 text-white py-3 rounded-2xl font-semibold hover:bg-orange-700 transition"
          >
            Login
          </motion.button>
        </form>

        <p className="text-sm text-gray-500 mt-6">
          (Admin credentials:{" "}
          <span className="text-orange-600 font-semibold">admin / admin</span>)
        </p>
      </motion.div>
    </div>
  );
}
