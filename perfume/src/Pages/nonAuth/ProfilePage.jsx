import React, { useEffect, useState, useContext } from "react";
import NavigationBar from "../common/nav-bar/NavigationBar";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { CartContext } from "../../context/CreateContext";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  if (!user) {
    return (
     <div className="flex flex-col items-center justify-start min-h-screen pt-32 bg-gray-50">
      <h2 className="text-xl text-red-600 font-semibold mb-8">
        Please login or sign up to view your profile.
      </h2>

      <div className="flex gap-6">
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-2 bg-pink-600 text-white rounded-lg shadow-md hover:bg-pink-700 transition"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/register")}
          className="px-6 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-900 transition"
        >
          Sign Up
        </button>
      </div>
    </div>

    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 mt-20">
      <NavigationBar />

      {/* Profile Card */}
      <div className="bg-white shadow-xl rounded-xl p-8 mb-10 text-center">
        <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-gray-500">Cart Items: {cart.length}</p>
      </div>

      {/* Orders Section */}
      <div className="bg-white shadow-lg rounded-xl p-6 border">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">My Orders</h2>
        {user.order && user.order.length > 0 ? (
          <div className="space-y-6">
            {user.order.map((order, index) => (
              <div
                key={index}
                className="p-6 border rounded-xl shadow hover:shadow-xl transition bg-gradient-to-r from-pink-50 to-white"
              >
                <div className="mb-4">
                  <p>
                    <span className="font-semibold">Order ID:</span> {order.id}
                  </p>
                  <p>
                    <span className="font-semibold">Customer:</span>{" "}
                    {order.name || user.name}
                  </p>
                  <p>
                    <span className="font-semibold">Date:</span>{" "}
                    {order.date || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        order.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {order.status || "Pending"}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">Address:</span>{" "}
                    {order.address || "No address provided"}
                  </p>
                  <p>
                    <span className="font-semibold">Payment:</span>{" "}
                    {order.paymentMethod?.toUpperCase()}
                  </p>
                  <p className="font-semibold text-lg mt-2">
                    Total: ₹{order.total}
                  </p>
                </div>

                {/* Items */}
                <div>
                  <span className="font-semibold block mb-2">Items:</span>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4 border rounded-lg p-3 bg-white shadow-sm cursor-pointer hover:shadow-md"
                        onClick={() => navigate(`/product/${item.id}`)}
                      >
                        <img
                          src={
                            item.image || "https://via.placeholder.com/80x80"
                          }
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium text-gray-800">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Qty: {item.qty || item.quantity || 1}
                          </p>
                          <p className="text-sm font-semibold text-pink-700">
                            ₹{item.price * (item.qty || item.quantity || 1)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You haven’t placed any orders yet.</p>
        )}
      </div>

      {/* Logout */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
