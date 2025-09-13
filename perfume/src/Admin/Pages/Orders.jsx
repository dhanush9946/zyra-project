import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");

  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3000/users");
        const allOrders = res.data.flatMap((user) =>
          user.order.map((o) => ({
            ...o,
            userId: user.id,
            userName: user.name,
            userEmail: user.email,
          }))
        );
        setOrders(allOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, []);

  // Handle status update
  const handleStatusChange = async (userId, orderId, newStatus) => {
    try {
      const userRes = await axios.get(`http://localhost:3000/users/${userId}`);
      const user = userRes.data;

      const updatedOrders = user.order.map((o) =>
        o.id === orderId ? { ...o, status: newStatus } : o
      );

      await axios.patch(`http://localhost:3000/users/${userId}`, {
        order: updatedOrders,
      });

      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId && o.userId === userId
            ? { ...o, status: newStatus }
            : o
        )
      );
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  // Calculate order stats
  const stats = {
    pending: orders.filter((o) => o.status === "pending").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };

  // Apply filter
  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Manage Orders</h2>

      {/* Order Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-yellow-100 text-yellow-700 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Pending</h3>
          <p className="text-2xl">{stats.pending}</p>
        </div>
        <div className="p-4 bg-blue-100 text-blue-700 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Shipped</h3>
          <p className="text-2xl">{stats.shipped}</p>
        </div>
        <div className="p-4 bg-green-100 text-green-700 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Delivered</h3>
          <p className="text-2xl">{stats.delivered}</p>
        </div>
        <div className="p-4 bg-red-100 text-red-700 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Cancelled</h3>
          <p className="text-2xl">{stats.cancelled}</p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg ${
            filter === "all" ? "bg-indigo-600 text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-4 py-2 rounded-lg ${
            filter === "pending" ? "bg-yellow-500 text-white" : "bg-gray-200"
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter("shipped")}
          className={`px-4 py-2 rounded-lg ${
            filter === "shipped" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Shipped
        </button>
        <button
          onClick={() => setFilter("delivered")}
          className={`px-4 py-2 rounded-lg ${
            filter === "delivered" ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
        >
          Delivered
        </button>
        <button
          onClick={() => setFilter("cancelled")}
          className={`px-4 py-2 rounded-lg ${
            filter === "cancelled" ? "bg-red-500 text-white" : "bg-gray-200"
          }`}
        >
          Cancelled
        </button>
      </div>

      {/* Orders Table */}
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Order ID</th>
            <th className="p-3 text-left">User</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Items</th>
            <th className="p-3 text-left">Total</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((o, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="p-3">{o.id}</td>
                <td className="p-3 font-medium">{o.userName}</td>
                <td className="p-3">{o.userEmail}</td>
                <td className="p-3">
                  {o.items && o.items.length > 0 ? (
                    <ul className="space-y-2">
                      {o.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <span>
                            {item.name} x {item.qty}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "No items"
                  )}
                </td>
                <td className="p-3 font-semibold text-indigo-600">₹{o.total}</td>
                <td className="p-3">
                  <select
                    value={o.status}
                    onChange={(e) =>
                      handleStatusChange(o.userId, o.id, e.target.value)
                    }
                    className="px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-4 text-gray-500">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
