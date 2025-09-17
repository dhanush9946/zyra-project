import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("https://database-1-p36v.onrender.com/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  // block/unblock user
  const toggleBlockUser = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "blocked" : "active";
      await axios.patch(`https://database-1-p36v.onrender.com/users/${id}`, {
        status: newStatus,
      });

      setUsers(
        users.map((u) =>
          u.id === id ? { ...u, status: newStatus } : u
        )
      );
    } catch (err) {
      console.error("Error updating user status:", err);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Manage Users </h2>

      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-center">Total Orders</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.slice(1).map((u) => (
            <tr key={u.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{u.id}</td>
              <td className="p-3">{u.name}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 text-xs rounded-lg ${
                    u.role === "admin"
                      ? "bg-purple-100 text-purple-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {u.role}
                </span>
              </td>

              {/* Total Orders */}
              <td className="p-3 text-center font-semibold text-indigo-600">
                {u.order ? u.order.length : 0}
              </td>

              {/* Block/Unblock */}
              <td className="p-3 text-center">
                <button
                  onClick={() => toggleBlockUser(u.id, u.status)}
                  className={`px-3 py-1 rounded-lg text-white transition ${
                    u.status === "active"
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {u.status === "active" ? "Block" : "Unblock"}
                </button>
              </td>
            </tr>
          ))}

          {users.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center p-4 text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
