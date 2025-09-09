import React, { useEffect, useState } from "react";
import NavigationBar from "../common/nav-bar/NavigationBar";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
      <div className="max-w-4xl mx-auto px-6 py-10 mt-20">
        <NavigationBar />
        <h2 className="text-center text-xl text-red-600 mt-6">
          Please login or sign up to view your profile.
        </h2>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-6 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-800"
          >
            Sign Up
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 mt-20">
      <NavigationBar />

      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        My Profile
      </h1>

      {/* Profile Details */}
      <div className="bg-white shadow-md rounded-lg p-6 space-y-4 mb-6">
        <p>
          <span className="font-semibold">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-semibold">Cart Items:</span>{" "}
          {user.cart?.length || 0}
        </p>
      </div>

      {/* Orders Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">My Orders</h2>
        {user.order && user.order.length > 0 ? (
          <ul className="space-y-3">
            {user.order.map((order, index) => (
              <li
                key={index}
                className="border p-4 rounded-md shadow-sm hover:shadow-md"
              >
                <p>
                  <span className="font-semibold">Order ID:</span> {order.id}
                </p>
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {order.date || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  {order.status || "Pending"}
                </p>
                <div className="mt-2">
                  <span className="font-semibold">Items:</span>
                  <ul className="ml-5 list-disc">
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.name} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">You haven’t placed any orders yet.</p>
        )}
      </div>

      {/* Logout */}
      <div className="flex justify-center">
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
