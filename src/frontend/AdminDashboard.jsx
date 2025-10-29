import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white/70 backdrop-blur-md text-center">
      <h1 className="text-4xl font-bold text-orange-600 mb-4">Admin Dashboard</h1>
      <p className="text-gray-700 mb-6">Welcome, <span className="font-semibold">Admin</span> 👋</p>

      <div className="bg-white rounded-xl shadow-md p-6 w-80">
        <ul className="text-left text-gray-700 space-y-3">
          <li>🛍️ Manage Products</li>
          <li>📦 View Orders</li>
          <li>👥 Manage Users</li>
        </ul>
      </div>

      <button
        onClick={handleLogout}
        className="mt-8 bg-orange-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-orange-700 transition"
      >
        Logout
      </button>
    </div>
  );
}
