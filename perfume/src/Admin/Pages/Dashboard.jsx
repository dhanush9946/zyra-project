import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { Users, ShoppingBag, DollarSign, Package } from "lucide-react";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await axios.get("https://database-1-p36v.onrender.com/users");
        const productsRes = await axios.get("https://database-1-p36v.onrender.com/perfumes");

        setUsers(usersRes.data);
        setProducts(productsRes.data);

        const allOrders = usersRes.data.flatMap((u) => u.order || []);
        setOrders(allOrders);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  // Stats
  const totalUsers = users.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalProducts = products.length;

  // Sales Trends
  const salesTrends = orders.reduce((acc, o) => {
  const date = new Date(o.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  if (!acc[date]) {
    acc[date] = { date, sales: 0 };
  }

  acc[date].sales += o.total;

  return acc;
}, {});

const chartData = Object.values(salesTrends).sort(
  (a, b) => new Date(a.date) - new Date(b.date)
);

  // Orders Status
  const statusCounts = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {});

  const statusData = Object.keys(statusCounts).map((status) => ({
    name: status,
    value: statusCounts[status],
  }));

  const COLORS = ["#f59e0b", "#10b981", "#3b82f6", "#ef4444"]; 

  // User Comparison Data
 const userComparisonData = users.slice(1).map((u, index) => ({
  id: index, 
  name: u.name || `User ${index + 1}`, // fallback if no name
  cart: u.cart?.length || 0,
  orders: u.order?.length || 0,
  wishlist: u.wishlist?.length || 0,
}));




  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
      <p className="text-gray-600 mb-8">
        Welcome back! Here’s what’s happening today.
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<Users className="h-10 w-10 text-blue-500 mr-4" />} label="Total Users" value={totalUsers} />
        <StatCard icon={<ShoppingBag className="h-10 w-10 text-green-500 mr-4" />} label="Total Orders" value={totalOrders} />
        <StatCard icon={<DollarSign className="h-10 w-10 text-yellow-500 mr-4" />} label="Total Revenue" value={`₹${totalRevenue.toFixed(2)}`} />
        <StatCard icon={<Package className="h-10 w-10 text-purple-500 mr-4" />} label="Total Products" value={totalProducts} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trends */}
        <ChartCard title="Sales Trends">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* User Comparison */}
        <ChartCard title="User Comparison">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={userComparisonData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="cart" fill="#3b82f6" />
            <Bar dataKey="orders" fill="#10b981" />
            <Bar dataKey="wishlist" fill="#f59e0b" />
          </BarChart>

          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Recent Orders & Recently Logged Users */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card title="Recent Orders">
            <ul className="space-y-3">
              {orders.slice(-5).map((o) => (
                <li key={o.id} className="flex justify-between text-sm border-b pb-1">
                  <span>#{o.id} - {o.name || "Unknown"}</span>
                  <span className={getStatusColor(o.status)}>{o.status}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Recently Logged Users */}
          <Card title="Recently Logged Users">
            <ul className="space-y-2 text-sm">
              {users.slice(-5).map((u) => (
                <li key={u.id} className="border-b pb-1">{u.name}</li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Orders Status */}
        <ChartCard title="Orders Status">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};

// Helper components
const StatCard = ({ icon, label, value }) => (
  <div className="bg-white shadow rounded-xl p-5 flex items-center">
    {icon}
    <div>
      <p className="text-gray-500">{label}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-white shadow rounded-xl p-5">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

const Card = ({ title, children }) => (
  <div className="bg-white shadow rounded-xl p-5">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

// Get color class based on status
const getStatusColor = (status) =>
  status === "pending"
    ? "text-yellow-500"
    : status === "delivered"
    ? "text-green-500"
    : status === "shipped"
    ? "text-blue-500"
    : "text-red-500";

export default Dashboard;
