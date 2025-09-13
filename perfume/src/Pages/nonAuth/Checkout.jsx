import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CreateContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast'

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    paymentMethod: "cod",
  });

  const totalPrice = cart.reduce((acc, item) => acc + item.price * (item.qty || 1), 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      toast.error("Please login first!");
      navigate("/login");
      return;
    }

    if (!form.name || !form.address || !form.phone) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      // prepare order
      const newOrder = {
        id: Date.now(),
        name: form.name,
        items: cart,
        total: totalPrice,
        address: form.address,
        phone: form.phone,
        paymentMethod: form.paymentMethod,
        status: "pending",
        date: new Date().toISOString(),
      };

      // fetch user from json-server
      const { data: user } = await axios.get(
        `http://localhost:3000/users/${storedUser.id}`
      );

      const updatedUser = {
        ...user,
        order: [...(user.order || []), newOrder],
        cart: [], 
      };

      await axios.put(`http://localhost:3000/users/${user.id}`, updatedUser);

      // update localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // clear cart in context
      clearCart();

      toast.success("Order placed successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Something went wrong while placing the order!");
    }
  };

  return (
    <div className="p-6 md:p-12">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Form */}
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          <textarea
            name="address"
            placeholder="Delivery Address"
            value={form.address}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          ></textarea>

          <div>
            <label className="block mb-2 font-medium">Payment Method</label>
            <select
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            >
              <option value="cod">Cash on Delivery</option>
              <option value="card">Credit/Debit Card</option>
              <option value="upi">UPI</option>
            </select>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="border p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <ul className="divide-y">
            {cart.map((item) => (
              <li key={item.id} className="py-2 flex justify-between">
                <span>
                  {item.name} x {item.qty || 1}
                </span>
                <span>₹{item.price * (item.qty || 1)}</span>
              </li>
            ))}
          </ul>
          <hr className="my-4" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>₹{totalPrice}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="mt-6 w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
